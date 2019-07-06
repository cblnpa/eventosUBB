import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../backend/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public userService: UserService, public router: Router ) { }

  canActivate(){

    if( this.userService.statusLogin() ) {
      console.log('el guard lo dejó pasar');
      return true;
    } else {
      console.log('bloqueado por el guard');
      this.router.navigate(['/login']);
      return false; 
    }

  }  
}
