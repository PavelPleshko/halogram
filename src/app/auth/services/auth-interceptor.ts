import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  	console.log(req);
  	if(req.headers.has('auth')){
  		const authReq = req.clone({headers:req.headers.set('Authorization', `Bearer ${this.getToken()}`)});
  		return next.handle(authReq);
  	}else{
  		return next.handle(req);
  	}
  	
    
  }

   private getToken(){
    return window.localStorage.getItem('token');
  }
}