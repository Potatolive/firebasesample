import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
