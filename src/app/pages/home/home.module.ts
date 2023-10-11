import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    FormsModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [
    HomePage,
    HighlightDirective
  ]
})
export class HomePageModule {}
