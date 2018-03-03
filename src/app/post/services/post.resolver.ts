import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Resolve, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {catchError,map} from 'rxjs/operators';
import {PostService} from './post.service';


@Injectable()
export class PostResolver implements Resolve<any>{
  constructor(private postService:PostService) {}



resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<any>{
	let user = route.params['userId'];
	if(user){
		return this.postService.getUserPosts(user).pipe(catchError(err=>of(err)))
	}else{
		return this.postService.getUserPosts().pipe(catchError(err=>of(err)))
	}

}
}