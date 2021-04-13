import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MatchUserPipe } from './pipes/match-user.pipe';


@NgModule({
  declarations: [MatchUserPipe],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
