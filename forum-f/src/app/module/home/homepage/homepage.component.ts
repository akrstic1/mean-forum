import { HttpClient } from '@angular/common/http';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from 'src/app/data/service/data.service';
import { Category } from 'src/app/data/model/category.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { HomeService } from '../home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  categories: Category[] = null;
  categoryResultResponse: Category[];

  constructor(
    private http: HttpClient,
    private homeService: HomeService,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryResultResponse = this.route.snapshot.data.categoryResponse;

    console.log(this.categoryResultResponse);

    this.categories = this.categoryResultResponse;
  }
}
