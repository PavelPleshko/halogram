import { Component,Input,Output,EventEmitter } from '@angular/core';
import {User} from '../../../shared/models/user';
@Component({
  selector: 'app-profile-single',
  templateUrl: './profile-single.component.html',
  styleUrls: ['./profile-single.component.css']
})
export class ProfileSingleComponent {
@Input() user:User;
@Input() currentUser:User;
@Output() followOrUnfollow:EventEmitter<string> = new EventEmitter<string>();

get following(){
	return this.currentUser.profile.following.some((userId:string)=>{
		return userId == this.user._id;
	})	
}

  constructor() { }

followOrUnfollowUser(id:string){
	this.followOrUnfollow.next(id);
}

}
