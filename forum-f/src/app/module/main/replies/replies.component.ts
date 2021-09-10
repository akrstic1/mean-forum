import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Post } from 'src/app/data/model/post.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { User } from 'src/app/data/model/user.model';
import { MainService } from '../main.service';
import { Reply } from 'src/app/data/model/reply.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  form: FormGroup;
  newReply: Reply;

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private sharedService: SharedService,
    private fb: FormBuilder
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

    this.form = this.fb.group({
      reply: ['', Validators.required],
    });
  }

  refreshPost() {
    this.mainService.getPost(this.post_id).subscribe((post) => {
      this.post = post;
      this.replies = post.replies;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.newReply = new Reply(
        this.form.get('reply').value,
        '60264b497bdf922a180ddd29', //TODO umetnut logiranog usera
        new Date()
      );
      this.mainService.addReply(this.newReply, this.post_id).subscribe((p) => {
        this.refreshPost();
        this.form.reset();
      });
    }
  }

  deleteReply(replyId: string) {
    this.mainService.deleteReply(this.post_id, replyId).subscribe((p) => {
      this.refreshPost();
    });
  }
}
