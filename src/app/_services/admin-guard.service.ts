import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { Observable, map } from 'rxjs';
@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router, private userService: UserService) {}
  canActivate(): boolean {
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