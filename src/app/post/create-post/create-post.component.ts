import { Component, OnInit,OnDestroy } from '@angular/core';
import {PostService} from '../services/post.service';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {fadeInOutAnimation} from '../../animations/animations';
import {ImageEditorService} from '../../image-editor/services/image-editor.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  animations:[fadeInOutAnimation]
})
export class CreatePostComponent implements OnInit,OnDestroy{
	image:string;
	action:boolean;
	changedImg:string;
  subscriptions=[];
form:FormGroup = this.fb.group({
	title:['',Validators.required],
	description:['',Validators.required],
	url:['',Validators.required]
});


  constructor(private fb:FormBuilder,private postService:PostService,
    private imageEditor:ImageEditorService) { }

  ngOnInit(){
      let imgSub = this.imageEditor.imageToEdit$.subscribe((img)=>{
       if(img){
         this.image = this.changedImg =  img;
       }
   });
      console.log(this.image);
      this.subscriptions.push(imgSub);
  }

  createPost(){
  	this.form.controls['url'].markAsTouched();
  	if(this.form.valid){
  		let postSub = this.postService.createPost(this.form.value)
  		.subscribe(data=>console.log(data));
      this.subscriptions.push(postSub);
  	}

  }



updateUrl(data){
	if(data){
		data = JSON.parse(data);
		this.form.controls['url'].patchValue(data.secure_url);
	}
}

loadPreview(data){
	this.image = data;
}

onUploadAction(action){
this.action = action.flag;
this.changedImg = action.img;
console.log(action);
}

ngOnDestroy(){
 
}
}
