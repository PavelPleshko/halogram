import {User} from './user';

export class Reply{
	_id:string;
	user:User;
	to:User;
	comment:string;
	body:string;
	likes:Array<string>;
	dislikes:Array<string>;
	createdAt:Date;
}