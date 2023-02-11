import RouterService from '@ember/routing/router-service';
import Service, { service } from '@ember/service';
import ModalService from './modal';
import RendererService from './renderer';

export default class AppService extends Service {
  @service declare renderer: RendererService;
  @service declare router: RouterService;
  @service declare modal: ModalService;
  @service declare session: any;
  initialized = false;
  deferredInstallPrompt: any = undefined;

  async initialize() {
    if (this.initialized) return;
    this.renderer.initialize();
    await this.session.setup();
    // this.checkForNewVersion();
    this.initialized = true;
  }

  // async checkForNewVersion() {
  //   const unencountedVersion = this.localStorage.getUnencountedVersion();
  //   if (unencountedVersion) {
  //     await sleep(1000);
  //     this.modal.confirm({
  //       title: 'Es gibt Neuigkeiten!',
  //       text: `Potber wurde auf Version ${unencountedVersion} aktualisiert.
  //       Tippe auf 'OK', um mehr über die Änderungen zu erfahren.`,
  //       icon: 'star',
  //       cancelLabel: 'Geh weg!',
  //       onSubmit: () => {
  //         this.modal.close();
  //         this.router.transitionTo('changelog');
  //       },
  //     });
  //   }
  //   this.localStorage.setEncounteredVersion();
  // }
}
