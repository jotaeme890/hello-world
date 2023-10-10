import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { IonicModule } from '@ionic/angular';
import { LetraApellidoPipe } from './pipes/letra-apellido.pipe';
import { FavInfoComponent } from './components/fav-info/fav-info.component';



@NgModule({
  declarations: [UserInfoComponent, LetraApellidoPipe, FavInfoComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    UserInfoComponent,
    FavInfoComponent
  ]
})
export class SharedModule { }
