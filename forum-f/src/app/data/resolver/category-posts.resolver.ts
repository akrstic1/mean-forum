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
    this.categoryToFilter = route.params.category;

    return this.dataService.getPosts().pipe(
      map((x) => {
        return x.filter((p) => p.category_name === this.categoryToFilter);
      }),
      catchError((err) => {
        console.log(err);
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
