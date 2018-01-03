import { Component,Output,Input,EventEmitter,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent{
@ViewChild('comment_control') comment_control:ElementRef;
@Input()  reply:boolean;
@Output() postNewComment = new EventEmitter();
@Output() postReply = new EventEmitter();
@Output() cancelReplyEvent=new EventEmitter();

  constructor() { }

postComment(data){
	if(!this.reply){
		this.postNewComment.next(data);
	}else{
		this.postReply.next(data);
	}
	this.comment_control.nativeElement.value='';
}
cancelReply(){
	this.cancelReplyEvent.next(true);
}
}
