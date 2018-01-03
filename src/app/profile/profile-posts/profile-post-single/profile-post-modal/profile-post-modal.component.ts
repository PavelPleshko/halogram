import { Component,Output,EventEmitter,Input,ViewChild,ElementRef,
	AfterViewChecked,ChangeDetectorRef,ChangeDetectionStrategy} from '@angular/core';
import {NgbActiveModal,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {PostService} from '../../../../post/services/post.service';
import {CommentService} from '../../../../comment/services/comment.service';
import {AuthService} from '../../../../auth/services/auth.service';
import {Post} from '../../../../shared/models/post';
import {Comment} from '../../../../shared/models/comment';
import {Reply} from '../../../../shared/models/reply';
import {User} from '../../../../shared/models/user';

@Component({
  selector: 'app-profile-post-modal',
  templateUrl: './profile-post-modal.component.html',
  styleUrls: ['./profile-post-modal.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProfilePostModalComponent implements AfterViewChecked{
@Input() post:Post;
@ViewChild('comment_form') comment_form:any;
@ViewChild('comment_section') comment_section:ElementRef;
@ViewChild('img_section') img_section:ElementRef;
user:User;
reply = false;

get liked(){
	return !!this.post.likes.find((userId)=>{
		return this.user._id == userId;
	})
}
get disliked(){
	return !!this.post.dislikes.find((userId)=>{
		return this.user._id == userId;
	})
}

  constructor(private cdr:ChangeDetectorRef,private postService:PostService,
  	private authService:AuthService,private activeModal:NgbActiveModal,
  	private commentService:CommentService){ 
  this.authService.currentUser$.subscribe((user:User)=>{
  	this.user = user;
  })
  }

  ngAfterViewChecked(){
this.comment_section.nativeElement.style.height = this.img_section.nativeElement.clientHeight +'px';
  }

likePost(){
	if(!this.liked){
		let id = this.post._id;
		this.postService.likePost(id).subscribe((data:Array<string>)=>{
			this.post.likes = data;
			this.cdr.markForCheck();
		});
	}
}

dislikePost(){
	if(!this.liked){
		let id = this.post._id;
		this.postService.dislikePost(id).subscribe((data:Array<string>)=>{
			this.post.dislikes = data;
			this.cdr.markForCheck();
		});
	}
}

postComment(body,id:string){
	this.reply = false;
	this.commentService.postComment(body,id).subscribe((data:Comment)=>this.post.comments.push(data));
}


onDeleteComment(id:string,postId:string){
	this.commentService.deleteComment(id,postId).subscribe((data)=>{
		if(data['ok']>0){
			let idx = this.post.comments.findIndex((comment:Comment)=>{
				return comment._id === id;
			});
			if(idx>=0){
				this.post.comments.splice(idx,1);
			}
		}
	});
}

onLikeOrUnlikeComment(comment,postId:string){
	let commentId=comment._id;
	let found = comment.likes.findIndex((id:string)=>{
		return this.user._id = id;
	})
	if(found>=0){
		this.commentService.unlikeComment(commentId,postId).subscribe((data:Comment)=>{
			let commentToReplaceIdx = this.findCommentIdx(this.post,commentId);
			if(commentToReplaceIdx>=0){
				this.post.comments.splice(commentToReplaceIdx,1,data);
			}
			
		});
	}else{
		this.commentService.likeComment(commentId,postId).subscribe((data:Comment)=>{
			console.log(data);
			let commentToReplaceIdx = this.findCommentIdx(this.post,commentId);
			if(commentToReplaceIdx>=0){
				this.post.comments.splice(commentToReplaceIdx,1,data);
			}
		});
	}
}

findCommentIdx(post,id:string){
	return post.comments.findIndex((comment:Comment)=>{
		return id == comment._id;
	})
}

replyToComment(comment:Comment){
	this.reply = true;
	this.commentService.pushComment(comment);
	
let element = this.comment_form.comment_control.nativeElement.form[0];
let value = comment.user.firstName + ' ' + comment.user.lastName+', ';
	element.value = value;
	element.focus();
}
onPostReply(data){
	let comment = this.commentService.commentToReply.getValue();
	let replyData = {};
	replyData['body'] = data;
	replyData['to'] = comment.user._id;
	this.commentService.postReply(comment._id,replyData).subscribe((data:Reply)=>this.commentService.pushReply(data));
}

cancelReply(){
	let element = this.comment_form.comment_control.nativeElement.form[0];
	element.value = '';
	element.focus();
	this.reply = false;
}


}
