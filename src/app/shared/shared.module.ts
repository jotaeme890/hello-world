import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { IonicModule } from '@ionic/angular';
import { LetraApellidoPipe } from './pipes/letra-apellido.pipe';
import { FavInfoComponent } from './components/fav-info/fav-info.component';
import { FavsPipe } from './pipes/favs.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './components/user-detail/user-detail.component';



@NgModule({
  declarations: [
    UserInfoComponent,
    LetraApellidoPipe,
    FavInfoComponent,
    FavsPipe,
    UserDetailComponent
  ],

  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  
  exports: [
    IonicModule,
    CommonModule,
    UserInfoComponent,
    FavInfoComponent,
    FavsPipe,
    UserDetailComponent
  ]
})
export class SharedModule { }
