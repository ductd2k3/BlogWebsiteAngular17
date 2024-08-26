import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private userService: UserService){}
  isLogged():boolean{
    return this.userService.isLogged() && !this.userService.isTokenExpired();
  }
  logout(){
    this.userService.logout();
  }
}
