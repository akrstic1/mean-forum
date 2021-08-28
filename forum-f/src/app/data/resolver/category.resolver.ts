import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../model/category.model';
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolver implements Resolve<Observable<Category[]>> {
  constructor(private _dataService: DataService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Category[]> {
    return this._dataService.getCategories().pipe(
      catchError((err) => {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
