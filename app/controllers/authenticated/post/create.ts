import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { PostFormContent } from 'potber/components/board/post-form';
import { PostCreateRouteModel } from 'potber/routes/authenticated/post/create';
import PostsService from 'potber/services/posts';

export default class PostCreateController extends Controller {
  declare model: PostCreateRouteModel;

  @service declare posts: PostsService;
  @tracked busy = false;

  queryParams = ['TID', 'page'];

  @action async handleSubmit(post: PostFormContent) {
    this.busy = true;
    await this.posts.createPost(this.model.thread.id, post);
    this.busy = false;
  }
}
