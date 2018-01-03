import { Component,Input,Output,EventEmitter,OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ImageEditorService} from '../../image-editor/services/image-editor.service';

@Component({
  selector: 'app-post-img-preview',
  templateUrl: './post-img-preview.component.html',
  styleUrls: ['./post-img-preview.component.css']
})
export class PostImgPreviewComponent implements OnDestroy{
@Input() image:string;
@Output() uploadAction:EventEmitter<any> = new EventEmitter<any>();

  constructor(private router:Router,private imageEditor:ImageEditorService) {
  console.log(this.image);
   }

 
handleImage(flag){
	this.uploadAction.next({flag,img:this.image});
}

editImage(){
	this.imageEditor.setImage(this.image);
this.router.navigate(['edit-image']);

}

ngOnDestroy(){
}
}
