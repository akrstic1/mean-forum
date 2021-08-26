import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { RepliesComponent } from './replies/replies.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'post', component: RepliesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
