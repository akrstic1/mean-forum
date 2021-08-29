import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../model/post.model';
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<Observable<Post>> {
  postToFilterId: string;

  constructor(private dataService: DataService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post> {
    this.postToFilterId = route.queryParamMap.get('id');

    return this.dataService.getPost(this.postToFilterId).pipe(
      catchError((err) => {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
