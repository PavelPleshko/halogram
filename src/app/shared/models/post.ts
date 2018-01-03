import {Comment} from './comment';
import {User} from './user';

export class Post{
_id:string;
author?:User;
url?:string;//image
title?:string;
description?:string;
likes?:Array<string>;
dislikes?:Array<string>;
comments?:Comment[];
createdAt?:Date;
updatedAt?:Date;
}