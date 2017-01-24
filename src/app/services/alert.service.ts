import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class AlertService {
  private errorMessage: Subject<string> = new BehaviorSubject('');
  errorMessage$ = this.errorMessage.asObservable();

  rasieError(err: any) {
    //this.errorMessage.next(this.getErrorMessage(err));
  }

  static getErrorMessage(err: any) {
    let errorMessage = err.statusText;
    try {
      errorMessage = JSON.parse(err._body).message
    } catch (ex) {
      if(!errorMessage) errorMessage = "Unexpected error";
    }
    return errorMessage;
  }
}