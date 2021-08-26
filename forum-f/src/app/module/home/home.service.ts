import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from '../../data/service/data.service';
import { Category } from '../../data/model/category.model';

@Injectable({
  providedIn: 'root',
})
/*Dohvaća http requestove iz data.service, obraduje request, te prosljeđuje u zainteresirane komponente*/
export class HomeService {
  categories: Category[] = null;
  categorySubject: BehaviorSubject<Category[]> = new BehaviorSubject(null);

  constructor(private dataService: DataService) {
    this.init();
  }

  //Dohvaća http request iz dataservica, mapira json u object array,
  //te preko behaviorsubjecta broadcasta svim subscribeanim komponentama
  init() {
    console.log('init homeservice', this.categorySubject);
    this.dataService
      .getCategories()
      .subscribe((res: { status: string; categories: Category[] }) => {
        this.categories = res.categories;
        console.log('hvatam i saljem kat', this.categorySubject);
        this.categorySubject.next(this.categories);
      });
  }

  //Vraća subject kategorija
  getCategories() {
    console.log('saljem subject', this.categorySubject);
    return this.categorySubject;
  }
}
