import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { User } from 'src/app/data/model/user.model';
import { Post } from '../../../data/model/post.model';
import { MainService } from '../main.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  name: string;

  postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  subscription: Subscription = null;

  users: User[] = [];
  usersSubject: BehaviorSubject<User[]> = new BehaviorSubject([]);

  constructor(
    private sharedService: SharedService,
    private mainService: MainService,
    private route: ActivatedRoute,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.params['kategorija'];

    this.postsSubject = this.mainService.getCategoryPosts();
    this.subscription = this.postsSubject.subscribe((res) => {
      this.posts = res.filter((p) => p.category_name == this.name);

      //Obrnuto sortiranje zbog prikazivanja posljednjeg replya
      this.posts.map((t) =>
        t.replies.sort(
          (a, b) =>
            new Date(b.reply_date).getTime() - new Date(a.reply_date).getTime()
        )
      );

      console.log(this.posts);
      /*
        setTimeout(() => {
          console.log(formatDate(this.posts[0].date, 'dd-MM-yyyy HH:mm:ss', this.locale));
        }, 2000);
        */
    });

    this.usersSubject = this.sharedService.getUsers();
    this.subscription = this.usersSubject.subscribe((res) => {
      this.users = res;
    });

    //this.posts = this.mainService.getCategoryPosts(this.name);
    //console.log("rez", this.posts)
  }
}
