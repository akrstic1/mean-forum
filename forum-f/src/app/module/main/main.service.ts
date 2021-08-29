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

@Injectable({
  providedIn: 'root',
})
export class MainService {
  categoryToFilter: string;

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

  getCategoryPosts(): Observable<Post[]> {
    this.categoryToFilter = this.route.snapshot.params.category;

    return this.dataService
      .getPosts()
      .pipe(
        map((x) => x.filter((p) => p.category_name === this.categoryToFilter))
      );
  }

  getPost(id: string) {
    return this.dataService.getPost(id).pipe(
      catchError((err) => {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }

  /*
  getCategoryPosts(name){
    console.log("trazim", name)
    return this.posts.filter(p => p.category_name == name);
  }


  getCategoryPosts(id){
    console.log("metoda")
    return this.posts.filter( p => p.category_id == id);
  }
  */
}
