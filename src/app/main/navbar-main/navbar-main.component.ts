import { Component,Input} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../shared/models/user';
@Component({
  selector: 'app-navbar-main',
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.scss']
})
export class NavbarMainComponent{
@Input() user:User;

  constructor(private authService:AuthService,private router:Router) { }

logout(){
	this.authService.logout();
}

}
