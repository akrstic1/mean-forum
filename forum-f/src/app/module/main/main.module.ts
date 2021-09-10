import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { PostsComponent } from './posts/posts.component';
import { RepliesComponent } from './replies/replies.component';
import { MatchUserPipe } from '../../shared/pipes/match-user.pipe';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostsComponent, RepliesComponent],
  imports: [CommonModule, MainRoutingModule, SharedModule, ReactiveFormsModule],
})
export class MainModule {}
