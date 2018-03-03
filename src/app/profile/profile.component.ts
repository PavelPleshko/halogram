import { Component, OnInit,OnDestroy} from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import {ProfileService} from './services/profile.service';

import {ActivatedRoute,Params} from '@angular/router';
import {Post} from '../shared/models/post';
import {User} from '../shared/models/user';
import {Profile} from '../shared/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,OnDestroy {
currentUser:any={};
imgSrc:string;
posts:Post[];
notAUser:boolean;
subscriptions:Array<any>=[]


  constructor(
    public authService:AuthService,
  	private profileService:ProfileService,
  	private route:ActivatedRoute) {}

  ngOnInit() {
  	  this.route.data.subscribe((data)=>{
      this.posts = data.posts;
    })

  	if(!this.route.snapshot.params['userId']){
  		this.notAUser = false;
  		let userSub = this.authService.currentUser.subscribe((updatedUser)=>{
        if(updatedUser != null){
             this.currentUser = updatedUser || {};
        }
  
      });

     this.subscriptions.push(userSub);
  		this.setProfileImg(this.currentUser);
    
  	}else{
  		let paramSub = this.route.params.switchMap((params:Params)=>{
  		if(params['userId']){
  			this.notAUser = true;
  			return this.profileService.getProfile(params['userId'])
  		}}).subscribe((profile:User)=>{
      
  		this.currentUser = profile;
  		let id =this.currentUser._id;
  		this.setProfileImg(this.currentUser);
  	})
      this.subscriptions.push(paramSub);
  	}
  
  	
     
  }


  updateProfile(data){
  	data = JSON.parse(data);
  	this.profileService.updateProfile(data.secure_url);
  }

  setProfileImg(user:any){
  	if(user.profile.hasOwnProperty('profileImg') && user.profile.profileImg){

  			this.imgSrc = user.profile.profileImg;
  		}else{
        this.imgSrc = user.profile.profileImg = '/assets/img/nophoto.jpg'
  		
  		}
  }

  ngOnDestroy(){
    this.subscriptions.forEach((subscription)=>{
      subscription.unsubscribe();
    })
  }
}
