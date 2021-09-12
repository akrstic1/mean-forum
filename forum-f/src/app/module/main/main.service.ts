import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subscription } from 'rxjs';
import { DataService } from '../../data/service/data.service';
import { Post } from '../../data/model/post.model';
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Reply } from 'src/app/data/model/reply.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  posts: Post[] = [];
  postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  subscription: Subscription = null;

  post: Post;
  postSubject: BehaviorSubject<Post> = new BehaviorSubject(null);

  constructor(
    private dataService: DataService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getCategoryPosts(categoryToFilter: string): Observable<Post[]> {
    return this.dataService
      .getPosts()
      .pipe(map((x) => x.filter((p) => p.category_id === categoryToFilter)));
  }

  getPost(id: string) {
    return this.dataService.getPost(id).pipe(
      catchError((err) => {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }

  addReply(newReply: Reply, postId: string): Observable<Reply> {
    return this.dataService.addReply(newReply, postId);
  }

  editReply(replyId: string, replyText: string, postId: string) {
    return this.dataService.editReply(replyId, replyText, postId);
  }

  deleteReply(postId: string, replyId: string) {
    return this.dataService.deleteReply(postId, replyId);
  }

  addPost(newPost: Post): Observable<any> {
    return this.dataService.addPost(newPost);
  }

  deletePost(postId: string): Observable<any> {
    return this.dataService.deletePost(postId);
  }

  getLikes(id: string): Observable<any> {
    return this.dataService.getLikes(id);
  }

  likePost(userId: string, postId: string): Observable<any> {
    return this.dataService.likePost(userId, postId);
  }
  unlikePost(userId: string, postId: string): Observable<any> {
    return this.dataService.unlikePost(userId, postId);
  }
}
