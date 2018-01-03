import { Component, OnInit,Input,Output,EventEmitter,ChangeDetectorRef,ChangeDetectionStrategy} from '@angular/core';
import {CommentService} from '../services/comment.service';
import {AuthService} from '../../auth/services/auth.service';
import {User} from '../../shared/models/user';
import {Comment} from '../../shared/models/comment';
import {Reply} from '../../shared/models/reply';


@Component({
  selector: 'app-comment-single',
  templateUrl: './comment-single.component.html',
  styleUrls: ['./comment-single.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CommentSingleComponent implements OnInit {
@Input() comment:Comment;
@Output() deleteComment:EventEmitter<string> = new EventEmitter<string>();
@Output() likeOrUnlike:EventEmitter<Comment> = new EventEmitter<Comment>();
@Output() reply:EventEmitter<Comment> = new EventEmitter<Comment>();
@Input() user:User;
currentUser:User;

get likedComment(){
	return this.comment.likes.includes(this.user._id);
}

constructor(private commentService:CommentService,
	private authService:AuthService,
	private cdr:ChangeDetectorRef) { }

  ngOnInit(){
  	this.currentUser = this.authService.currentUser.getValue();
  	this.commentService.incomingReply$.subscribe((reply:Reply)=>{
  		if(reply){
  			let replyIdx = this.findReplyIdx(this.comment,reply._id);
  			if(replyIdx<0 && reply.comment == this.comment._id){
  				this.comment.replies = [...this.comment.replies,reply];
  				this.cdr.markForCheck();
  			}
  		}
  	})
  }

onDeleteComment(){
	this.deleteComment.next(this.comment._id);
}

likeOrUnlikeComment(){
this.likeOrUnlike.next(this.comment);
}

replyToComment(comment:Comment){
	this.reply.next(comment);
}

onLikeOrUnlikeReply(reply){
	let replyId=reply._id;
	let found = reply.likes.findIndex((id)=>{
		return this.currentUser._id = id;
	})
	if(found>=0){
		this.commentService.unlikeReply(replyId,this.comment._id).subscribe((data:Reply)=>{
			let replyToReplaceIdx = this.findReplyIdx(this.comment,replyId);
			if(replyToReplaceIdx>=0){
				this.comment.replies.splice(replyToReplaceIdx,1,data);
				this.comment.replies = [...this.comment.replies];
				this.cdr.markForCheck();
			}
			
		});
	}else{
		this.commentService.likeReply(replyId,this.comment._id).subscribe((data:Reply)=>{
			console.log(data);
			let replyToReplaceIdx = this.findReplyIdx(this.comment,replyId);
			if(replyToReplaceIdx>=0){
				this.comment.replies.splice(replyToReplaceIdx,1,data);
				this.comment.replies = [...this.comment.replies];
				this.cdr.markForCheck();
			}
		});
	}

}

findReplyIdx(comment:Comment,id:string){
	return comment.replies.findIndex((reply:Reply)=>{
		return id == reply._id;
	})
}

onDeleteReply(deleteObj){
	this.commentService.deleteReply(deleteObj.replyId,deleteObj.commentId).subscribe((data:object)=>{
		console.log(data);
		if(data['ok']>0){
			let idx = this.comment.replies.findIndex((reply:Reply)=>{
				return reply._id === deleteObj.replyId;
			});
			if(idx>=0){
				this.comment.replies.splice(idx,1);
				this.comment.replies = [...this.comment.replies];
				this.cdr.markForCheck();
			}
		}
	});
}
}
