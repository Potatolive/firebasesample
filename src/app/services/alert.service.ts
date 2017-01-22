import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class AlertService {
  private errorMessage: Subject<string> = new BehaviorSubject('');
  errorMessage$ = this.errorMessage.asObservable();

  rasieError(error: string) {
    this.errorMessage.next(error);
  }
}