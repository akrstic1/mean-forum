import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Post } from 'src/app/data/model/post.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { User } from 'src/app/data/model/user.model';
import { MainService } from '../main.service';
import { Reply } from 'src/app/data/model/reply.model';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.css'],
})
export class RepliesComponent implements OnInit {
  kategorija: string;
  post_id: string;

  post: Post;
  replies: Reply[] = [];

  users: User[];

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((res) => {
      this.post_id = res.get('id');
    });

    this.users = this.route.snapshot.data.userListResponse;
    this.post = this.route.snapshot.data.postResponse;
    if (this.post != null) {
      this.replies = this.post.replies;
    }
  }
}
