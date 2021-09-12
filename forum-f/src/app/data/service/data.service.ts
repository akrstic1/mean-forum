import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';
import { Reply } from '../model/reply.model';

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

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.API_URL + '/api/posts');
  }

  getPost(id): Observable<Post> {
    return this.http.get<Post>(environment.API_URL + '/api/posts/' + id);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.API_URL + '/api/users');
  }

  addReply(reply: Reply, id: string): Observable<Reply> {
    return this.http.post<Reply>(
      environment.API_URL + '/api/posts/' + id,
      reply
    );
  }

  deleteReply(postId: string, replyId: string): Observable<string> {
    return this.http.put(
      environment.API_URL + '/api/posts/' + postId,
      {
        replyId,
      },
      { responseType: 'text' }
    );
  }

  addPost(post: Post): Observable<any> {
    return this.http.post<Post>(environment.API_URL + '/api/posts/', post);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(environment.API_URL + '/api/posts/' + id);
  }

  getLikes(id: string): Observable<any> {
    return this.http.get<any>(environment.API_URL + `/api/posts/${id}/likes`);
  }

  likePost(userId: string, postId: string): Observable<any> {
    return this.http.post<any>(
      environment.API_URL + `/api/posts/${postId}/likes/${userId}`,
      {}
    );
  }
  unlikePost(userId: string, postId: string): Observable<any> {
    return this.http.delete(
      environment.API_URL + `/api/posts/${postId}/likes/${userId}`
    );
  }
}
