import { Component,Input,Output,EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import {Reply} from '../../../shared/models/reply';
import {User} from '../../../shared/models/user';
@Component({
  selector: 'app-comment-reply-single',
  templateUrl: './comment-reply-single.component.html',
  styleUrls: ['./comment-reply-single.component.scss'],
})
export class CommentReplySingleComponent {
@Input() reply:Reply;
@Input() currentUser:User;
@Output() delete:EventEmitter<{replyId:string,commentId:string}> = new EventEmitter<{replyId:string,commentId:string}>();
@Output() likeOrUnlike:EventEmitter<Reply> = new EventEmitter<Reply>();

get likedReply(){
	return this.reply.likes.find((id:string)=>id == this.currentUser._id);
}

  constructor() { }

 
onDeleteReply(replyId:string,commentId:string){
	this.delete.next({replyId,commentId});
}

likeOrUnlikeReply(reply:Reply){
	this.likeOrUnlike.next(reply);
}
}
