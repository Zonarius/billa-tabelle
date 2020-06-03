import * as req from 'request-promise';
import qs from 'qs';
import request from 'request';
import { SearchResults, SearchFilter, ArticleID, ArticleInfos } from './types';

export default class BillaClient {
  private api: request.RequestAPI<req.RequestPromise<any>, req.RequestPromiseOptions, request.RequiredUriUrl>;

  constructor() {
    this.api = req.defaults({
      baseUrl: "http://www.billa.at/api",
      json: true  
    });
  }

  public searchByUrl(url: string): Promise<SearchResults> {
    const segments = url.split("/");
    const category = segments[segments.length - 1];
    return this.search({ category });
  }

  public async search(filters: SearchFilter): Promise<SearchResults> {
    return this.api.get("/search/full", {
      qs: qs.stringify(filters)
    })
  }

  public async articleInfos(id: ArticleID): Promise<ArticleInfos> {
    const response = await this.api.get(`/articles/${id}/infos`);
    return response[0];
  }
}
