import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { Post } from '../model/post.model';
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryPostsResolver implements Resolve<Observable<Post[]>> {
  categoryToFilter: string;

  constructor(private dataService: DataService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post[]> {
    this.categoryToFilter = route.queryParams.categoryId;

    return this.dataService.getPosts().pipe(
      map((x) => {
        return x.filter((p) => p.category_id === this.categoryToFilter);
      }),
      catchError((err) => {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
