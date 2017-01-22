import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute }    from '@angular/router';
import { AuthState, AuthStateProvider } from '../services/auth.service'

import { 
  AngularFire, 
  FirebaseListObservable, 
  AuthProviders, 
  FirebaseAuthState,
   
} from 'angularfire2';

// declare const FB:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: FirebaseAuthState;
  email: string;
  password: string;
  error: string = '';
  returnUrl: string = '';

  constructor(
    private af: AngularFire, 
    private router: Router, 
    private route: ActivatedRoute,
    private authStateProvider: AuthStateProvider
    ) {
    // FB.init({
    //     appId      : '337330989724619',
    //     cookie     : true,  // enable cookies to allow the server to access
    //                         // the session
    //     xfbml      : true,  // parse social plugins on this page
    //     version    : 'v2.5' // use graph api version 2.5
    // });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.waitForLogin();
    // FB.getLoginStatus(response => {
    //     this.statusChangeCallback(response);
    // });
  }

  waitForLogin() {
    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = user;
        
        this.user.auth.getToken(/* forceRefresh */ true)
        .then((idToken : any) => this.handleTokenSuccess(idToken))
        .catch((error : any) => this.handleSigninError(error));
      }
      else {
        this.user = null;
      }
    });
  }

  routeTo() {
    console.log('routing');
    console.log(this.router.navigate(['/feeds']));
  }

  handleTokenSuccess(idToken: string) {
    console.log(idToken);
    console.log(this.returnUrl);
    
    this.authStateProvider.token = idToken;
    this.authStateProvider.user = this.user;
  }

  register(email: string, password: string) {
    this.af.auth.createUser({email: this.email, password: this.password})
    .then((result : any) => this.handleSigninSuccess(result))
    .catch((error : any) => this.handleSigninError(error));
  }

  // fbLogin() {
  //   FB.login();
  // }

  // statusChangeCallback(resp) {
  //   console.log(resp);
  //   if (resp.status === 'connected') {
  //       // connect here with your server for facebook login by passing access token given by facebook
  //   }else if (resp.status === 'not_authorized') {
        
  //   }else {
        
  //   }
  // };
    
  login() {
    this.af.auth.login(
    {
      email: this.email, 
      password: this.password
    })
    .then((result : any) => this.handleSigninSuccess(result))
    .catch((error : any) => this.handleSigninError(error));
  }

  handleSigninSuccess(result: any) {
    this.error = '';
    this.router.navigate([this.returnUrl])
  }

  handleSigninError(error: any) {
    this.error = error.message;
    console.log(this.error);
  }

  logout() {
    this.af.auth.logout();
  }
}
