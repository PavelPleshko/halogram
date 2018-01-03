import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {BASE_URL,HEADERS} from '../../app.settings';

import {Reply} from '../../shared/models/reply';
import {Comment} from '../../shared/models/comment';



@Injectable()
export class CommentService {
commentToReply:BehaviorSubject<Comment>= new BehaviorSubject<Comment>(null);
commentToReply$=this.commentToReply.asObservable();
incomingReply:BehaviorSubject<Reply> = new BehaviorSubject<Reply>(null);
incomingReply$ = this.incomingReply.asObservable();

  constructor(private http:HttpClient) { }



postComment(data,id:string){
	let url = `${BASE_URL}api/${id}/comment`;

return this.http.post(url,{data},{headers:HEADERS});
}


getPostComments(postId:string){
		let url = BASE_URL+'api/'+postId+'/comments';
		return this.http.get(url,{headers:HEADERS});
}


deleteComment(commentId:string,postId:string){
let url = BASE_URL+'api/'+postId+'/comment/'+ commentId;
return this.http.delete(url,{headers:HEADERS});
}

likeComment(commentId:string,postId:string){
	let url = BASE_URL+'api/'+postId+'/comment/'+commentId+'/like';
	return this.http.post(url,null,{headers:HEADERS});
}

unlikeComment(commentId:string,postId:string){
	let url = BASE_URL+'api/'+postId+'/comment/'+commentId+'/unlike';
	return this.http.post(url,null,{headers:HEADERS});
}


pushComment(comment:Comment){
	this.commentToReply.next(comment);
}

postReply(commentId:string,data){
	let url=BASE_URL+'api/comment/'+commentId+'/reply';
	return this.http.post(url,data,{headers:HEADERS});
}

pushReply(reply:Reply){
	this.incomingReply.next(reply);
}


likeReply(replyId:string,commentId:string){
	let url = BASE_URL+'api/comment/'+commentId+'/'+replyId+'/like';
	return this.http.post(url,null,{headers:HEADERS});
}

unlikeReply(replyId:string,commentId:string){
	let url = BASE_URL+'api/comment/'+commentId+'/'+replyId+'/unlike';
	return this.http.post(url,null,{headers:HEADERS});
}

deleteReply(replyId:string,commentId:string){
let url = BASE_URL+'api/comment/'+commentId+'/'+replyId;
return this.http.delete(url,{headers:HEADERS});
}

}
