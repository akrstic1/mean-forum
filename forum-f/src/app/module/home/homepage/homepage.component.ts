import { HttpClient } from '@angular/common/http';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from 'src/app/data/service/data.service';
import { Category } from 'src/app/data/model/category.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { HomeService } from '../home.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  categories: Category[] = [];
  categoryResultResponse: Category[];

  form: FormGroup;
  newCategory: Category;

  currentUserId = '60264b497bdf922a180ddd29';

  constructor(
    private http: HttpClient,
    private _homeService: HomeService,
    private _sharedService: SharedService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categoryResultResponse = this.route.snapshot.data.categoryResponse;
    this.categories = this.categoryResultResponse;

    this.form = this.fb.group({
      categoryName: ['', Validators.required],
    });
  }

  refreshCategories() {
    this._homeService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addCategory() {
    if (this.form.valid) {
      this.newCategory = new Category(this.form.get('categoryName').value);

      this._homeService.addCategory(this.newCategory).subscribe((p) => {
        this.refreshCategories();
        this.form.reset();
      });
    }
  }
}
