import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root',
})
export class LikeResolver implements Resolve<any> {
  postToFilterId: string;

  constructor(private dataService: DataService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.postToFilterId = route.queryParamMap.get('id');

    return this.dataService.getLikes(this.postToFilterId).pipe(
      catchError((err) => {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
