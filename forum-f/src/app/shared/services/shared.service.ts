import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../../services/data.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  id : string = null;

  users : User[] = [];
  usersSubject : BehaviorSubject<User[]> = new BehaviorSubject([]);

  constructor(private dataService : DataService) {
    this.init();
  }

  init(){
    this.dataService.getUsers()
      .subscribe((res : {status:string, users : User[]}) => {
        this.users = res.users;

        console.log("aaa", this.users);
        this.usersSubject.next(this.users);
      })
  }

  getUsers(){
    return this.usersSubject;
  }
}
