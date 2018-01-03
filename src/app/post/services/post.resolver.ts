import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {PostService} from './post.service';
import {AuthService} from '../../auth/services/auth.service';

@Injectable()
export class PostResolver implements Resolve<any>{
  constructor(private postService:PostService,
  private router: Router) {}



resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<any>{
	let user = route.params['userId'];
	if(user){
		return this.postService.getUserPosts(user).catch(err=>{
			return Observable.of(err);
		})
	}else{
		return this.postService.getUserPosts().catch(err=>{
			return Observable.of(err);
		})
	}

}
}