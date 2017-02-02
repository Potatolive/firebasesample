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
import { FbService } from './services/fb.service';
import { FeedComponent } from './feed/feed.component';
import { FbfeedComponent } from './fbfeed/fbfeed.component';
import { FeedApi } from '../../stub/socialmessage-api/api/FeedApi';
import { SecureCrudService } from './services/secure.crud.service';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';

const appRoutes: Routes = [
  { path: 'feeds', component: FeedsComponent , canActivate: [AuthGuard] },
  { path: 'posts/:id', component: PostsComponent , canActivate: [AuthGuard] },
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
    FeedsComponent,
    FeedComponent,
    FbfeedComponent,
    PostsComponent,
    PostComponent
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
    FbService,
    FeedApi,
    SecureCrudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
