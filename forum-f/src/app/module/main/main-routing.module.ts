import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryPostsResolver } from 'src/app/data/resolver/category-posts.resolver';
import { LikeResolver } from 'src/app/data/resolver/like.resolver';
import { PostResolver } from 'src/app/data/resolver/post.resolver';
import { UserListResolver } from 'src/app/data/resolver/user-list.resolver';
import { PostsComponent } from './posts/posts.component';
import { RepliesComponent } from './replies/replies.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    resolve: {
      categoryPostsResponse: CategoryPostsResolver,
      userListResponse: UserListResolver,
    },
  },
  {
    path: 'post',
    component: RepliesComponent,
    resolve: {
      postResponse: PostResolver,
      userListResponse: UserListResolver,
      likeResponse: LikeResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
