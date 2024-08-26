import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  let userService = inject(UserService);
  if(state.url.includes('/user') 
    && userService.haveAccess() !== null 
    && userService.haveAccess().role === 'customer'
    && !userService.isTokenExpired()
  ){
    return true;   
  }
  inject(Router).navigate(['/login'])
  return false;
};
