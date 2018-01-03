import { Component, OnInit,Input,Output,EventEmitter,OnChanges,SimpleChanges } from '@angular/core';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders,FileItem } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import {CloudinaryService} from '../../cloudinary/cloudinary.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit,OnChanges {
imgSrc:string;
@Input() mode;
@Input() user;
@Input() notAUser:boolean = false;
@Input() action:boolean;
@Input() image;
@Output() changed = new EventEmitter();
@Output() previewChanged = new EventEmitter();
file;
userImgUrl:string = null;
uploader:FileUploader;
uploaderOptions:FileUploaderOptions;
completed=false;
started=false;
  constructor(private cloudinary: Cloudinary,private cloudService:CloudinaryService){}
 

  ngOnInit() {
    if(this.user){
       this.userImgUrl = this.user.profile.profileImg.slice();
    }
   
  this.uploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/image/upload/`,
      autoUpload: this.mode == 'profile' ? true : false,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    }
  	this.uploader = new FileUploader(this.uploaderOptions);
     this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      let tags = this.mode == 'post' ? 'post_photo' : 'user_photo';
        
      form.append('tags', tags);
      form.append('file', fileItem);

      
      fileItem.withCredentials = false;

      return { fileItem, form };
    }
      this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>{
     
     console.log('File uploaded to Cloudinary');
     this.completed = true;
    this.changed.next(response);
      if(this.mode == 'profile'){
        console.log('send request to delete photo from cloud');
        let public_id=this.getPublicId(this.userImgUrl)
        this.cloudService.deleteImage(public_id).subscribe(data=>console.log(data));
      }
    };
  
  }

ngOnChanges(changes:SimpleChanges){
		if(this.uploader){
			this.action == true ? this.onSubmit(
			) : this.onCancel();
		}
}

getPublicId(url){
  url = url.split('/');
  let requiredChunk:string;
  let regex:RegExp = /\.jpg$|jpeg$|png$/g;
  for(var i=0;i<url.length;i++){
    if(regex.test(url[i]) === true){
      requiredChunk = url[i];
      break;
       }
  }
  requiredChunk = this.removeExtension(requiredChunk);
  console.log(requiredChunk);
  return requiredChunk;
}

removeExtension(chunk:string){
  var sliceEndIdx:number = chunk.indexOf('.');
  if(sliceEndIdx){
     chunk = chunk.slice(0,sliceEndIdx);
  }
  return chunk;
}

onChange(data){
	let reader = new FileReader();
	let file = data.target.files[0];
	this.file = file.name;
	reader.readAsDataURL(file);
  
	reader.onload = ()=>{

		this.previewChanged.next(reader.result);
	}
	

}
onSubmit(){
	if(this.uploader.queue.length>=1){
		this.started=true;
		this.uploader.uploadAll();
	}else{
   let file = new File([this.convertUrlToBlob(this.image)],"newimage.jpeg");
   console.log(file);
   this.uploader.addToQueue([file]);
   this.uploader.uploadAll();
  }
}

convertUrlToBlob(dataURL){
   let arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

onCancel(){
if(this.uploader.queue){
	this.uploader.cancelAll();
  this.uploader.clearQueue();
  this.file = null;
}
	this.previewChanged.next(null);
}

chooseImg(input:HTMLInputElement){
input.click();
}


}
