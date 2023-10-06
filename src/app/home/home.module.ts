import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { UserInfoComponent } from "../shared/components/user-info/user-info.component"
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FavsPipe } from './favs.pipe';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [
    HomePage,
    FavsPipe,
    HighlightDirective
  ]
})
export class HomePageModule {}
