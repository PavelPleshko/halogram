import {Reply} from './reply';
import {User} from './user';

export class Comment{
_id:string;
user:User;
post:string;
body:string;
likes:Array<string>;
replies:Reply[];
createdAt:Date;
}