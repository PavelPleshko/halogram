import {Profile} from './profile';

export class User{
	_id:string;
	email?:string;
	firstName:string;
	lastName:string;
	profile?:Profile;
	active?:boolean;
	createAt?:string;
	token?:{
		hash:string
	};
}