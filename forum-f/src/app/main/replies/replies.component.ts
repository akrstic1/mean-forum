import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/post.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { User } from 'src/app/shared/models/user.model';
import { MainService } from '../main.service';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css'],
})
export class RepliesComponent implements OnInit {
  kategorija: string;
  post_id: string;

  post: Post;
  replies: any[] = [];
  postSubject: BehaviorSubject<Post> = new BehaviorSubject(null);
  post_subscription: Subscription = null;

  users: User[];
  usersSubject: BehaviorSubject<User[]> = new BehaviorSubject([]);
  users_subscription: Subscription = null;

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    console.log('intam', this.post);
    /*
    this.kategorija = this.kategorija=this.route.snapshot.params['kategorija'];
    this.route.queryParamMap.subscribe(res =>{
      this.post_id = res.get("id")
    })

    this.postsSubject = this.mainService.getCategoryPosts();
    this.subscription = this.postsSubject
      .subscribe( res => {
        this.post = res.filter(p=> p.category_name == this.kategorija).filter(p=>p._id == this.post_id);
        console.log(this.post);
      });
    */
    this.route.queryParamMap.subscribe((res) => {
      this.post_id = res.get('id');
    });

    this.postSubject = this.mainService.getPost(this.post_id);

    this.post_subscription = this.postSubject.subscribe((res) => {
      this.post = res;
      if (res != null) {
        this.replies = res[0].replies;
        console.log('pratim ovaj', this.post, 'izvuka san', this.replies);
      } else {
        console.log('Null');
      }
    });

    this.usersSubject = this.sharedService.getUsers();
    this.users_subscription = this.usersSubject.subscribe((res) => {
      console.log('dohvaceno', res);
      this.users = res;
    });
  }

  ngOnDestroy() {
    this.post_subscription.unsubscribe();
  }
}
