import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryResolver } from 'src/app/data/resolver/category.resolver';
import { MainModule } from '../main/main.module';
import { PostsComponent } from '../main/posts/posts.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    resolve: {
      categoryResponse: CategoryResolver,
    },
  },
  { path: ':kategorija', loadChildren: () => MainModule },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
