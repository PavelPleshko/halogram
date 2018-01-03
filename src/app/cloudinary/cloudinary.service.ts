import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL,HEADERS} from '../app.settings';



@Injectable()
export class CloudinaryService {
  constructor(private http:HttpClient){}


deleteImage(public_id,multi=false){
	let url = BASE_URL + 'api/cloudinary/destroy/'+public_id;
	return this.http.post(url,null,{headers:HEADERS});
}
}
