import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('userId')) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login or any other page
      return false;
    }
  }
}
