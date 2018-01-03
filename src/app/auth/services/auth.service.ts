import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import 'rxjs/add/operator/catch';
import {BASE_URL,HEADERS} from '../../app.settings';
import {User} from '../../shared/models/user';

@Injectable()
export class AuthService {
	currentUser:BehaviorSubject<User> = new BehaviorSubject<User>(null);
	currentUser$:Observable<User> = this.currentUser.asObservable();

  constructor(private http:HttpClient,private router:Router) { }

registerUser(data):Observable<any>{
const path = BASE_URL + 'auth/register';
return this.http.post(path,data).delay(1500).catch(err=>{
		console.log(err);
		return Observable.of(err);
		
	});
}


signIn(data):Observable<User>{
	const path =BASE_URL + 'auth/signin';
	return this.http.post(path,data).delay(1500).catch(err=>{
		console.log(err);
		return Observable.of(err);
		
	});
}

setCurrentUser(data:User){
	if(data){
		this.currentUser.next(data);
		if(data.token){
	let token = data.token.hash;
	window.localStorage.setItem('token',token);
	}
	}else{
		this.currentUser.next(undefined);
	}
}

logout(){
	let url = BASE_URL+'auth/logout';
	this.http.post(url,null,{headers:HEADERS}).subscribe(data=>{
		console.log(data);
		if(data['success']){
			this.router.navigateByUrl('/signin');
			this.setCurrentUser(undefined);
			window.localStorage.removeItem('token');
		}
	})
}
}
