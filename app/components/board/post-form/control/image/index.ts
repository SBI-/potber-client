import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Post from 'potber-client/models/post';
import ModalService from 'potber-client/services/modal';

interface Signature {
  Args: {
    post: Post;
    textarea: HTMLTextAreaElement;
  };
}

export default class PostFormControlImageComponent extends Component<Signature> {
  @service declare modal: ModalService;

  @action handleClick() {
    this.modal.input({
      title: 'Bild einfügen',
      icon: 'image',
      label: 'URL',
      type: 'url',
      onSubmit: this.handleSubmit,
    });
  }

  @action handleSubmit(value: string) {
    const message = this.args.post.message || '';
    const selectionEnd = this.args.textarea.selectionEnd;
    const insertion = `[img]${value}[/img]`;
    this.args.post.message = `${message.substring(
      0,
      selectionEnd
    )}${insertion}${message.substring(selectionEnd, message.length)}`;
    this.args.textarea.value = this.args.post.message;
    // Close the dialog and...
    this.modal.close(() => {
      // ...reselect the textarea and update the caret position to match
      // the inserted emoji so the user can continue typing
      const newCaretPosition = selectionEnd + insertion.length;
      this.args.textarea.select();
      this.args.textarea.setSelectionRange(newCaretPosition, newCaretPosition);
    });
  }
}
