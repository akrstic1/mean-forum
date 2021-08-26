import { HttpClient } from '@angular/common/http';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from 'src/app/data/service/data.service';
import { Category } from 'src/app/data/model/category.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  categorySubject: BehaviorSubject<Category[]> = new BehaviorSubject(null);
  categories: Category[] = null;
  categorySubscription: Subscription = null;

  constructor(
    private http: HttpClient,
    private homeService: HomeService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    //Dohvaća subject iz homeservica
    this.categorySubject = this.homeService.getCategories();

    //Radi subscription na observable, dohvaća array u komponentu
    this.categorySubscription = this.categorySubject.subscribe((res) => {
      this.categories = res;
      console.log('comp', this.categories);
    });
  }

  /*
  //Šalje id u sharedservice da kasnije dohvati u posts komponenti(sakrivanje id-a iz url-a)
  posaljiId(id){
    this.sharedService.id = id;
  */
}
