import Service, { service } from '@ember/service';
import { appConfig } from 'potber-client/config/app.config';
import MessagesService from './messages';
import { IntlService } from 'ember-intl';
import * as Users from './api/endpoints/users.endpoints';
import * as Posts from './api/endpoints/posts.endpoints';
import { ApiError } from './api/error';
import CustomSession from './custom-session';

export default class ApiService extends Service {
  @service declare messages: MessagesService;
  @service declare intl: IntlService;
  @service declare session: CustomSession;

  // --- Endpoints are being defined in this section --- //
  findUserById = Users.findById;
  createPost = Posts.create;
  // --------------------------------------------------- //

  /**
   * Triggers a `fetch` to the API server and returns the data. Any errors will be logged automatically.
   * @param request The `RequestInit` object.
   * @returns The data.
   */
  fetch = async (path: string, request?: RequestInit) => {
    if (!path.startsWith('/')) path = `/${path}`;
    const url = `${appConfig.apiUrl}${path}`;
    try {
      this.messages.log(
        `Outgoing request: ${request?.method ?? 'GET'} ${url}`,
        { context: this.constructor.name, type: 'info' },
      );
      const headers: Record<string, string> = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      if (this.session.isAuthenticated) {
        headers[
          'Authorization'
        ] = `Bearer ${this.session.data.authenticated.access_token}`;
      }
      const response = await fetch(url, {
        ...request,
        headers: { ...headers, ...request?.headers },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new ApiError(
          data.statusCode ?? response.status,
          data.error ?? response.statusText,
          data.message ?? response.statusText,
        );
      }
      return data;
    } catch (error: unknown) {
      this.messages.log(JSON.stringify(error), {
        context: this.constructor.name,
        type: 'error',
      });
      if (error instanceof ApiError) {
        if (isNaN(error.statusCode) || error.statusCode > 499) {
          this.messages.showNotification(this.intl.t('error.unknown'), 'error');
        } else if (error.statusCode === 401) {
          this.session.invalidate();
        }
      }
      throw error;
    }
  };
}