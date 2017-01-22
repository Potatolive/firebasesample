import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FeedsComponent } from './feeds/feeds.component';
import {AuthGuard} from './helpers/auth.helper';
import { AuthStateProvider } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { FeedService } from './services/feed.service';

const appRoutes: Routes = [
  { path: 'feeds', component: FeedsComponent , canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent}  
];

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyDUcXX4E5KyUS-4OevD3F25IM_46teJW3Q",
    authDomain: "socialtv-8ef55.firebaseapp.com",
    databaseURL: "https://socialtv-8ef55.firebaseio.com",
    storageBucket: "socialtv-8ef55.appspot.com",
    messagingSenderId: "44694130322"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [
    AuthGuard,
    AuthStateProvider,
    AlertService,
    FeedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
