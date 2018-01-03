import { Component, OnInit,Input,OnDestroy } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {ProfileService} from '../../profile/services/profile.service';
import {User} from '../../shared/models/user';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit,OnDestroy {
@Input() profiles:User[];
currentUser:User;
subscriptions:Subscription[] = [];
  constructor(private authService:AuthService,
  	private profileService:ProfileService) { }

  ngOnInit() {
  	let authSub = this.authService.currentUser$.subscribe((user)=>{
  		this.currentUser = user;
  	})
  	this.subscriptions.push(authSub);
  }


onFollowOrUnfollow(userId){
let followSub = this.profileService.followOrUnfollowUser(userId).subscribe((data:User)=>{
		console.log(data);
  		this.currentUser = data;
  		this.authService.setCurrentUser(data);
  	})
this.subscriptions.push(followSub);

}

ngOnDestroy(){
	this.subscriptions.forEach((subscription)=>{
		return subscription.unsubscribe();
	})
}
}
