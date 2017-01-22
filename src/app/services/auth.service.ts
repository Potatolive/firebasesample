import { Injectable } from '@angular/core';
import { 
  FirebaseAuthState   
} from 'angularfire2';

export class AuthState {
  public token: string;
  public user: FirebaseAuthState;
}

@Injectable()
export class AuthStateProvider {
  public token: string;
  public user: FirebaseAuthState; 
  
  constructor() {
    console.log('AuthStateProvider ...');
  }
}