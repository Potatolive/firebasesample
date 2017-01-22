import { Injectable }     from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot }    from '@angular/router';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import {Observable, Subscriber} from 'rxjs';
import { AuthState, AuthStateProvider } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private data: Observable<boolean>;
  private authenticated: boolean = false;
  private state: RouterStateSnapshot;

  constructor(public af: AngularFire, protected router: Router, private authStateProvider: AuthStateProvider) {
    this.data = new Observable<boolean>(
      (subscriber: Subscriber<boolean>) => {
        this.af.auth.subscribe(user => {
          if(user) {
            user.auth.getToken(/* forceRefresh */ true)
                    .then((idToken : any) => {
                      authStateProvider.token = idToken;
                      authStateProvider.user = user;
                      subscriber.next(true);
                    })
                    .catch((error : any) => {
                      subscriber.next(false);
                    });
            
          } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.state.url }});
            subscriber.next(false);
          }
        });
      }
    );
    console.log('Attaching observer');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.state = state;
    return this.data;
  }
}