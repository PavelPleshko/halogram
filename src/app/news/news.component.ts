import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../profile/services/profile.service';
import {AuthService} from '../auth/services/auth.service';
import {User} from '../shared/models/user';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
profiles:User[];
currentUser:User;

  constructor(private authService:AuthService,
  	private profileService:ProfileService) { }

  ngOnInit() {
  	this.getUsersProfiles();
  }

  getUsersProfiles(){
  	this.profileService.getProfiles().subscribe((data:User[])=>{
  		this.profiles = data;
  	})
  }

}
