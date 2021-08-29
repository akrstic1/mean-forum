import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user.model';
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root',
})
export class UserListResolver implements Resolve<Observable<User[]>> {
  constructor(private dataService: DataService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> {
    return this.dataService.getUsers().pipe(
      catchError((err) => {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
