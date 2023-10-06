import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { UserInfoComponent } from "./user-info/user-info.component"
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LetraApellidoPipe } from '../pipes/letra-apellido.pipe';
import { FavsPipe } from '../favs.pipe';
import { HighlightDirective } from './highlight.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage, 
    UserInfoComponent,
    LetraApellidoPipe,
    FavsPipe,
    HighlightDirective
  ]
})
export class HomePageModule {}
