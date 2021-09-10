export class Reply {
  public constructor(
    reply_text: string,
    reply_user_id: string,
    reply_date: Date
  ) {
    this.reply_text = reply_text;
    this.reply_user_id = reply_user_id;
    this.reply_date = reply_date;
  }
  _id: string;
  reply_text: string;
  reply_user_id: string;
  reply_date: Date;
}
