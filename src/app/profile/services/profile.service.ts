import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AuthService} from '../../auth/services/auth.service';
import {BASE_URL,HEADERS} from '../../app.settings';
import {User} from '../../shared/models/user';
@Injectable()
export class ProfileService {
	user:User;
  constructor(private http:HttpClient,private authService:AuthService) { 
  	this.authService.currentUser$.subscribe((user:User)=>{
  		if(user){
  			this.user = user;
  		}	
  	})}


updateProfile(profileImg){
	
	let url = BASE_URL + 'api/' + this.user['_id'] + '/update';
	return this.http.post(url,{profileImg},{headers:HEADERS})	
	.subscribe((user:User)=>this.authService.setCurrentUser(user));
}

getProfiles(criteria?){
	if(!criteria){
		var url=BASE_URL+'api/profiles';
	}
return this.http.get(url,{headers:HEADERS});
}

getProfile(userId:string){
	let url = BASE_URL+'api/profiles/'+userId;
	return this.http.get(url);
}

followOrUnfollowUser(userId:string){
	if(userId == this.user['_id']){
		return;
	}else{
		var url;
		let found = this.findUserToFollow(this.user,userId);
		if(found>=0){
			url = BASE_URL+'api/profiles/'+userId+'/unfollow';
		}else{
			url = BASE_URL+'api/profiles/'+userId+'/follow';
		}
		return this.http.post(url,null,{headers:HEADERS});
	}
	
}


findUserToFollow(user:User,userToFollowId:string){
return user.profile.following.findIndex((following)=>{
	return following === userToFollowId;
})
}
}
