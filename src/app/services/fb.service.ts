import { Injectable }     from '@angular/core';
import {Observable, Subscriber} from 'rxjs';

declare const FB:any;

@Injectable()
export class FbService {
  private accessToken : string;

  public get AccessToken() : string {
    return this.accessToken;
  }

  constructor() {
    
  }

  init() {
    FB.init({
      appId      : '337330989724619',
      cookie     : false,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.5' // use graph api version 2.5
    });
  }

  login() : Observable<Boolean> {
    return new Observable<Boolean>(
      (subscriber: Subscriber<Boolean>) => {
        FB.login(
          function(response) {
            subscriber.next(true);  
          }, 
          {scope: 'pages_show_list'}
        );
      }
    );
  }

  getPages() : Observable<string[]> {
    return new Observable<string[]>(
      (subscriber: Subscriber<string[]>) => {
        FB.api('/me/accounts', function(response) {
          subscriber.next(response);
        });
      }
    );
  }
}