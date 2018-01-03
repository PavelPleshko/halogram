import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Post} from '../../shared/models/post';
import {BASE_URL,HEADERS} from '../../app.settings';


@Injectable()
export class PostService {



  constructor(private http:HttpClient) { }



createPost(data):Observable<any>{
	let url = BASE_URL + 'api/post/new';

return this.http.post(url,data,{headers:HEADERS});
}


getUserPosts(userId?:string):Observable<any>{
	if(!userId){
		let url = BASE_URL+'api/posts';
		return this.http.get(url,{headers:HEADERS});
	}else{
		let url = BASE_URL+'api/'+userId+'/posts';
		return this.http.get(url,{headers:HEADERS});
	}
}

likePost(postId:string){
if(!postId) return;
let url = BASE_URL + 'api/post/'+postId+'/like';
return this.http.post(url,null,{headers:HEADERS});
}

dislikePost(postId:string){
if(!postId) return;
let url = BASE_URL + 'api/post/'+postId+'/dislike';
return this.http.post(url,null,{headers:HEADERS});
}

}
