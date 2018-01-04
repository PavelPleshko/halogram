import { Component } from '@angular/core';
import {AuthService} from './auth/services/auth.service';
import {Router,NavigationEnd} from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	user=null;
	editor:boolean = false;
 constructor(private authService:AuthService,private router:Router){
this.authService.currentUser$.subscribe((user)=>{
	if(!user){
		this.user = null;
	}else{
		this.user = user;
	}
	
})
this.router.events.subscribe((event)=>{
	if (event instanceof NavigationEnd) {
		if(event.url ==='/edit-image'){
			this.editor = true;
		}else{
			this.editor = false;
		}
	}
})
 }
}
