import { Component,Input,Output,EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import {Reply} from '../../../shared/models/reply';
import {User} from '../../../shared/models/user';
@Component({
  selector: 'app-comment-replies',
  templateUrl: './comment-replies.component.html',
  styleUrls: ['./comment-replies.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CommentRepliesComponent {
@Input() replies:Reply[];
@Input() currentUser:User;
@Output() delete:EventEmitter<Reply> = new EventEmitter<Reply>();
@Output() likeOrUnlike:EventEmitter<object>=new EventEmitter<object>();


  onLikeOrUnlikeReply(reply:Reply){
  	this.likeOrUnlike.next(reply);
  }

  onDeleteReply(deleteObj){
  	this.delete.next(deleteObj);
  }
}
