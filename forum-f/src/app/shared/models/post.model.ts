import { Reply } from "./reply.model";

export class Post {
    public constructor(_id : string, text : string, user_id : string, category_id : string, category_name : string, theme : string, replies : Reply[], date:Date){
        this._id = _id;
        this.text = text;
        this.user_id = user_id;
        this.category_id = category_id;
        this.category_name = category_name;
        this.theme = theme;
        this.replies = replies;
        this.date = date;
    }
    _id : string;
    text : string;
    user_id : string;
    category_id : string;
    category_name : string;
    theme : string;
    replies : Reply[];
    date : Date;
    username? : string;
}