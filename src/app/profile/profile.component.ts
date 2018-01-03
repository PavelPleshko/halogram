import { Component, OnInit,OnDestroy} from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import {ProfileService} from './services/profile.service';
import {PostService} from '../post/services/post.service';
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
currentUser:User;
imgSrc:string;
uploader:FileUploader;
uploaderOptions:FileUploaderOptions;
posts:Post[];
notAUser:boolean;
subscriptions:Array<any>=[]


  constructor(private authService:AuthService,private cloudinary: Cloudinary,
  	private profileService:ProfileService,private postService:PostService,
  	private route:ActivatedRoute) {}

  ngOnInit() {
  	  this.route.data.subscribe((data)=>{
      this.posts = data.posts;
    })

  	if(!this.route.snapshot.params['userId']){
  		this.notAUser = false;
  		let userSub = this.authService.currentUser$.subscribe((updatedUser)=>{
        this.currentUser = updatedUser;
      });
      this.subscriptions.push(userSub);
  		this.setProfileImg(this.currentUser);
  	}else{
  		let paramSub = this.route.params.switchMap((params:Params)=>{
  		if(params['userId']){
  			this.notAUser = true;
  			return this.profileService.getProfile(params['userId'])
  		}}).subscribe((profile:User)=>{
        console.log(profile);
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

  setProfileImg(user:User){
  	if(user.profile.profileImg){
  			this.imgSrc = user.profile.profileImg;
  		}else{
  			this.imgSrc ='/assets/img/nophoto.jpg';
  		}
  }

  ngOnDestroy(){
    this.subscriptions.forEach((subscription)=>{
      subscription.unsubscribe();
    })
  }
}
