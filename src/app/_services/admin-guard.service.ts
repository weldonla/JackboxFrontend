import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { Observable, map } from 'rxjs';
@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router, private userService: UserService) {}
  canActivate(): boolean {
    // @todo There is a bug here that when you refresh when logged in as an admin, the user service forgets who the current user is.
    // We really should be issuing 'isAdmin' credentials as part of the jwt token, and using that to confirm admin status rather than the 
    // current user subject in the user service.
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['login']);
        return false;
      }
      else if (!this.userService.currentUserIsAdmin) {
        this.router.navigate(['home'])
      }
      return true;
  }
}