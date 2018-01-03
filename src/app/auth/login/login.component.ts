import { Component, OnInit } from '@angular/core';
import { Validators, FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms'; 
import {Router,ActivatedRoute} from '@angular/router';
import {UserModel} from '../user.model';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
returnUrl:string;
userModel:UserModel;
loginForm:FormGroup;
submitted:boolean = false;
error:boolean = false;
message:string;
  constructor(public formBuilder: FormBuilder,public router:Router,
   private authService:AuthService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
  	this.activateRegForm();
  }


    activateRegForm(){
  	this.loginForm = this.formBuilder.group({
 'email':['',Validators.required],
 'password':['',Validators.required]
  	})
  }


  onSubmitForm(form:FormGroup){

if(!form.valid) return;
this.submitted = true;
this.authService.signIn(form.value)
.subscribe((response)=>{
	this.authService.setCurrentUser(response);
	console.log(response);
  let that = this;
  if(response['status'] != 400){
    this.error = false;
    this.message = 'Authentication successful! Redirecting...';
   setTimeout(function(){
that.router.navigateByUrl(that.returnUrl);
  },2300);
  }else{
      this.error = true;
      this.submitted=false;
   this.message = response['error'].message.toLowerCase()+' Please try again';
    return;
  } 
})
}


}
