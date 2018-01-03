import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth/services/auth.service';

@Injectable()
export class ImageEditorService {
imageToEdit:BehaviorSubject<any> = new BehaviorSubject(null);
imageToEdit$:Observable<any> = this.imageToEdit.asObservable();
editedImage;

  constructor(private authService:AuthService){
  	this.authService.currentUser$.subscribe((user)=>{
  		if(!user){
  			this.setImage(null);
  		}
  	})
  }

setImage(img,saveOriginal?:boolean){
	this.imageToEdit.next(img);
	if(saveOriginal){
		this.editedImage = img;
	}
}

}
