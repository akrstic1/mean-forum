import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

/*-DOHVACANJE HTTP REQUESTOVA SA API-A
  -POZIVA SE U SERVISIMA KOMPONENATA*/
export class DataService {

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get(environment.API_URL + '/api/categories' );
  }

  getPosts(){
    return this.http.get(environment.API_URL + '/api/posts' );
  }

  getPost(id){
    return this.http.get(environment.API_URL + '/api/posts/' + id );
  }

  getUsers(){
    return this.http.get(environment.API_URL + '/api/users' );
  }

}
