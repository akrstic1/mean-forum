export class User {
  public constructor(
    _id: string,
    username: string,
    admin: boolean,
    password: string
  ) {
    this._id = _id;
    this.username = username;
    this.admin = admin;
    this.password = password;
  }
  _id: string;
  username: string;
  admin: boolean;
  password: string;
}
