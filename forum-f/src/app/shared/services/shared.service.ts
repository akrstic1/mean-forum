import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../../data/service/data.service';
import { User } from '../../data/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  id: string = null;

  users: User[] = [];
  usersSubject: BehaviorSubject<User[]> = new BehaviorSubject([]);

  constructor(private dataService: DataService) {}

  getUsers() {
    return this.usersSubject;
  }
}
