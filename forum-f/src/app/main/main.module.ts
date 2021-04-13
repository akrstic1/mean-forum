import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PostsComponent } from './posts/posts.component';
import { RepliesComponent } from './replies/replies.component';
import { MatchUserPipe } from '../shared/pipes/match-user.pipe';


@NgModule({
  declarations: [PostsComponent, RepliesComponent, MatchUserPipe],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
