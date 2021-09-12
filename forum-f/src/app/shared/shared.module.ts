import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MatchUserPipe } from './pipes/match-user.pipe';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [MatchUserPipe, NavbarComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [MatchUserPipe, NavbarComponent],
})
export class SharedModule {}
