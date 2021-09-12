import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { User } from 'src/app/data/model/user.model';
import { Post } from '../../../data/model/post.model';
import { MainService } from '../main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reply } from 'src/app/data/model/reply.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  categoryPosts: Post[] = [];
  categoryPostsResultResponse: Post[];

  categoryName: string;
  categoryId: string;

  users: User[] = [];
  usersSubject: BehaviorSubject<User[]> = new BehaviorSubject([]);

  form: FormGroup;
  newPost: Post;
  submitted: boolean = false;

  constructor(
    private sharedService: SharedService,
    private mainService: MainService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.params.category;
    this.categoryId = this.route.snapshot.queryParams.categoryId;

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

    this.form = this.fb.group({
      postName: ['', Validators.required],
      postText: ['', Validators.required],
    });
  }

  refreshPost() {
    this.mainService
      .getCategoryPosts(this.categoryId)
      .subscribe((categoryPosts) => {
        this.categoryPosts = categoryPosts;
      });
  }

  addPost() {
    this.submitted = true;
    if (this.form.valid) {
      this.newPost = new Post(
        this.form.get('postText').value,
        '60264b497bdf922a180ddd29', //TODO umetnut logiranog usera
        this.categoryId,
        this.categoryName,
        this.form.get('postName').value,
        <Reply[]>[],
        new Date()
      );
      this.mainService.addPost(this.newPost).subscribe((p) => {
        this.refreshPost();
        this.form.reset();
        this.submitted = false;
      });
    }
  }

  deletePost(postId: string) {
    this.mainService.deletePost(postId).subscribe((p) => {
      console.log('refreshed');
      this.refreshPost();
    });
  }
}
