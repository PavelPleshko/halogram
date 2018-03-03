import { Component, OnInit,Input} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfilePostModalComponent} from './profile-post-modal/profile-post-modal.component';
import {
    DomSanitizer,
    SafeStyle
} from '@angular/platform-browser';
import {Post} from '../../../shared/models/post';
@Component({
  selector: 'app-profile-post-single',
  templateUrl: './profile-post-single.component.html',
  styleUrls: ['./profile-post-single.component.css'],
  entryComponents:[ProfilePostModalComponent]
})

export class ProfilePostSingleComponent implements OnInit {
@Input() post:Post;
image:SafeStyle;
  constructor(public modalService:NgbModal,public sanitization:DomSanitizer) { }

  ngOnInit() {
this.image = this.sanitization.bypassSecurityTrustStyle(`url(${this.post.url})`);
  }

open(){
	const ref = this.modalService.open(ProfilePostModalComponent,{size:'lg',windowClass:'app-modal-window'});
	ref.componentInstance.post = this.post;
}


}
