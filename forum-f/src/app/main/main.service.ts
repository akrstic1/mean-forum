import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { Post } from '../shared/models/post.model';
import { SharedService } from '../shared/services/shared.service';

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
    private sharedService: SharedService
  ) {
    this.init();
  }

  init() {
    this.dataService
      .getPosts()
      .subscribe((res: { status: string; posts: Post[] }) => {
        this.posts = res.posts;

        //Sortira datume samih tema za pravilno priakzivanje
        this.posts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        //Sortira replies na teme za pravilno prikazivanje
        this.posts.map((t) =>
          t.replies.sort(
            (a, b) =>
              new Date(a.reply_date).getTime() -
              new Date(b.reply_date).getTime()
          )
        );

        //console.log("sub", this.posts);
        this.postsSubject.next(this.posts);
      });
  }

  getCategoryPosts() {
    //console.log("saljem", this.postsSubject)
    return this.postsSubject;
  }

  getPost(id: string) {
    this.dataService
      .getPost(id)
      .subscribe((res: { status: string; post: Post }) => {
        this.post = res.post;
        this.postSubject.next(this.post);
      });
    return this.postSubject;
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
