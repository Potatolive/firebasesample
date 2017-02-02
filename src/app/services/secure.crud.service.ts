import { Injectable, Optional, Type, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { AlertHelper } from '../helpers/alert.helper';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { AuthStateProvider } from '../services/auth.service';
import { PutResponse } from '../../../stub/socialmessage-api/model/PutResponse';
import { GeneralResponse } from '../../../stub/socialmessage-api/model/GeneralResponse';

interface CrudApi<T> {
  defaultHeaders: Headers;
  list(tokem: string): Observable<T[]>;
  create(token: string, item: T);
  updateById (idToken: string, id: string, item: T) : Observable<PutResponse>;
  deleteById (idToken: string, id: string ) : Observable<GeneralResponse>;
}

@Injectable()
export class SecureCrudService<T, F extends CrudApi<T>> {
  private api: F;

  private _items: Subject<any> = new BehaviorSubject([]);
  private _item: Subject<T> = new BehaviorSubject(null);
  private _errorMessage: Subject<string> = new BehaviorSubject('');
  private _processing: Subject<boolean> = new BehaviorSubject(false);

  public get items() : Subject<T[]> {
    return this._items;
  }

  public get item() : Subject<T> {
    return this._item;
  }

  public get erroMessage() : Subject<string> {
    return this._errorMessage;
  }

  public get processing() : Subject<boolean> {
    return this._processing;
  }

  public get Api() : F {
    return this.api;
  }

  public get Token() : string {
    return this.authStateProvider.token;
  }

  constructor(
    // private http : Http, 
    private authStateProvider: AuthStateProvider
    ) {
    // this.serviceType = typeof this.api;
    // console.log('Crud Model ' + apiService.Token);
  }

  init(api : F) {
    this.api = api;
    this.api.defaultHeaders.append("Content-Type", "application/json");
  }

  listItems() {
    this._errorMessage.next('');
    this._processing.next(true);
    this.api.list(this.authStateProvider.token).subscribe(
      data => {
        this._items.next(data);
      },
      err => {
        this._errorMessage.next(AlertHelper.getErrorMessage(err));
      },
      () => {
        this.erroMessage.subscribe(data=>{console.log(data)}).unsubscribe();
        this._processing.next(false);
      }
    );
  }

  update(item: T) {
    let id = item ? (item as any)._id : undefined;
    this._errorMessage.next('');
    this._processing.next(true);
    this.api.updateById(this.authStateProvider.token, id, item).subscribe(
      data => {
        this._errorMessage.next(data.message);
      },
      err => {
        this._errorMessage.next(AlertHelper.getErrorMessage(err));
      },
      () => {
        this.erroMessage.subscribe(data=>{console.log(data)}).unsubscribe();
        this._processing.next(false);
      });
  }

  create(item: T) {
    this._errorMessage.next('');
    this._processing.next(true);
    this.api.create(this.authStateProvider.token, item).subscribe(
      data => {
        this._item.next(data);
      },
      err => {
        this.erroMessage.next(AlertHelper.getErrorMessage(err));
      },
      () => {
        this.erroMessage.subscribe(data=>{console.log(data)}).unsubscribe();
        this._processing.next(false);
      });
  }

  delete(item: T) {
    let id = item ? (item as any)._id : undefined;
    this._errorMessage.next('');
    this._processing.next(true);
    this.api.deleteById(this.authStateProvider.token, id).subscribe(
      data => {
        this._errorMessage.next(data.message);
      },
      err => {
        this._errorMessage.next(AlertHelper.getErrorMessage(err));
      },
      () => {
        this.erroMessage.subscribe(data=>{console.log(data)}).unsubscribe();
        this._processing.next(false);
      });
  }
}