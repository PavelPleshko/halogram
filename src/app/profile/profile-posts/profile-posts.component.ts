import { Component, OnInit,Input } from '@angular/core';
import {Post} from '../../shared/models/post';
@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {
@Input() posts:Post[];
  constructor() { }

  ngOnInit() {
  }

}
