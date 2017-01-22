import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable, Subscriber } from 'rxjs';

import { AuthStateProvider } from './auth.service';
import { AlertService } from './alert.service';
import { ApiService } from './api.service';

import { Feed } from '../../../stub/socialmessage-api/model/Feed';

@Injectable()
export class FeedService extends ApiService {
  
  constructor(
    http : Http, 
    authStateProvider: AuthStateProvider, 
    private alertService: AlertService) 
  {
    super(http, authStateProvider);
  }

  getFeeds() : Observable<Feed[]> {
    return new Observable<Feed[]>(
      (subscriber: Subscriber<Feed[]>) => {
        this.api.getFeeds(this.token).subscribe(
          data => {
            subscriber.next(data);
          },
          err => {
            this.alertService.rasieError(JSON.parse(err._body).message);
            subscriber.next(null);
          }
        );
      }
    );
  }
}