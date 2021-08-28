import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})

/*-DOHVACANJE HTTP REQUESTOVA SA API-A
  -POZIVA SE U SERVISIMA KOMPONENATA*/
export class DataService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.API_URL + '/api/categories');
  }

  getPosts() {
    return this.http.get(environment.API_URL + '/api/posts');
  }

  getPost(id) {
    return this.http.get(environment.API_URL + '/api/posts/' + id);
  }

  getUsers() {
    return this.http.get(environment.API_URL + '/api/users');
  }
}
