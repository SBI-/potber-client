import Component from '@glimmer/component';
import { Thread } from 'potber/services/api/types/thread';
import ENV from 'potber/config/environment';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import { service } from '@ember/service';
import RendererService from 'potber/services/renderer';

export interface Signature {
  Args: {
    thread: Thread;
    page?: number;
  };
}

export default class NavRoutesThreadComponent extends Component<Signature> {
  @service declare renderer: RendererService;
  declare args: Signature['Args'];

  get subtitle() {
    return `Seite ${this.currentPage} von ${this.args.thread.pagesCount}`;
  }

  get nextPageVisible() {
    return this.currentPage < this.args.thread.pagesCount;
  }

  get currentPage() {
    return this.args.page || 1;
  }

  get nextPage() {
    return this.currentPage + 1;
  }

  get previousPageVisible() {
    return this.currentPage > 1;
  }

  get previousPage() {
    return this.currentPage - 1;
  }

  get originalUrl() {
    return `${ENV.APP['FORUM_URL']}thread.php?TID=${this.args.thread.id}`;
  }

  @action async reload() {
    this.renderer.showLoadingIndicator();
    (getOwner(this as unknown) as any)
      .lookup('route:thread')
      .refresh()
      .then(() => {
        this.renderer.hideLoadingIndicator();
      })
      .catch(() => {
        this.renderer.hideLoadingIndicator();
      });
  }
}