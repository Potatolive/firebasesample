import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { AuthStateProvider } from './auth.service';
import { DefaultApi } from '../../../stub/socialmessage-api/api/api';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  protected token: string;
  protected api : DefaultApi;

  public get Token() : string {
    return this.token;
  }

  public get Api() : DefaultApi {
    return this.api;
  }

  constructor(
    private http : Http, 
    private authStateProvider: AuthStateProvider) 
  {
    this.token = authStateProvider.token;
    this.api = new DefaultApi(this.http, environment.api);
    this.api.defaultHeaders.append("Content-Type", "application/json");
  }
}