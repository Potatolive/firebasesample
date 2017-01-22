import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { AuthStateProvider } from './auth.service';
import { DefaultApi } from '../../../stub/socialmessage-api/api/api';

@Injectable()
export class ApiService {
  protected token: string;
  protected api : DefaultApi;

  constructor(
    private http : Http, 
    private authStateProvider: AuthStateProvider) 
  {
    console.log(authStateProvider.token);
    this.token = authStateProvider.token;
    this.api = new DefaultApi(this.http, 'https://socialmessaging-api.herokuapp.com');
  }
}