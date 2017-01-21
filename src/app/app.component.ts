import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, FirebaseAuthState } from 'angularfire2';

declare const FB:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  user: FirebaseAuthState;
  title = 'app works!';
  email: string;
  password: string;
  error: string = '';

  constructor(public af: AngularFire) {
    this.items = af.database.list('/items');

    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = user;
        
        this.user.auth.getToken(/* forceRefresh */ true).then(function(idToken) {
          console.log(idToken);
        }).catch(function(error) {
          console.log('Error getting token');
        });
      }
      else {
        // user not logged in
        this.user = null;
      }
    });

    FB.init({
        appId      : '337330989724619',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use graph api version 2.5
    });
  }

  register(email: string, password: string) {
    
  }

  fbLogin() {
    FB.login();
  }

  statusChangeCallback(resp) {
    console.log(resp);
    if (resp.status === 'connected') {
        // connect here with your server for facebook login by passing access token given by facebook
    }else if (resp.status === 'not_authorized') {
        
    }else {
        
    }
  };
    
  ngOnInit() {
    FB.getLoginStatus(response => {
        this.statusChangeCallback(response);
    });
  }

  login() {
    console.log(this.user);
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
    //Route to next pagess
  }

  handleSigninError(error: any) {
    this.error = error.message;
  }

  logout() {
    this.af.auth.logout();
  }
}