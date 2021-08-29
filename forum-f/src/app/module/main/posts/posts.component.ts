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
  categoryPosts: Post[] = [];
  categoryPostsResultResponse: Post[];

  categoryName: string;

  users: User[] = [];
  usersSubject: BehaviorSubject<User[]> = new BehaviorSubject([]);

  constructor(
    private sharedService: SharedService,
    private mainService: MainService,
    private route: ActivatedRoute,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.params.category;

    this.categoryPostsResultResponse =
      this.route.snapshot.data.categoryPostsResponse;

    //Obrnuto sortiranje zbog prikazivanja posljednjeg replya
    this.categoryPostsResultResponse.map((t) =>
      t.replies.sort(
        (a, b) =>
          new Date(b.reply_date).getTime() - new Date(a.reply_date).getTime()
      )
    );

    this.categoryPosts = this.categoryPostsResultResponse;
    this.users = this.route.snapshot.data.userListResponse;
  }
}
