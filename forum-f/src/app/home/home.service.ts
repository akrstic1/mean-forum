import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { Category } from '../shared/category.model';

@Injectable({
  providedIn: 'root'
})
/*Dohvaća http requestove iz data.service, obraduje request, te prosljeđuje u zainteresirane komponente*/

export class HomeService {

  categories : Category[] = null;
  categorySubject : BehaviorSubject<Category[]> = new BehaviorSubject(null);

  constructor(private dataService:DataService) {
    this.init();
  }

  //Dohvaća http request iz dataservica, mapira json u object array,
  //te preko behaviorsubjecta broadcasta svim subscribeanim komponentama
  init(){
    this.dataService.getCategories()
      .subscribe( (res: {status:string, categories: Category[]}) =>{
        this.categories = res.categories;
        this.categorySubject.next(this.categories);
      })
  }

  //Vraća subject kategorija
  getCategories(){
    return this.categorySubject;
  }

}
