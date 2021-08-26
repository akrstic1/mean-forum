import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './module/auth/auth.module';
import { HomeModule } from './module/home/home.module';

const routes: Routes = [
  { path: 'login', loadChildren: () => AuthModule },
  { path: '', loadChildren: () => HomeModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
