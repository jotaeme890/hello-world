import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { IonicModule } from '@ionic/angular';
import { LetraApellidoPipe } from './pipes/letra-apellido.pipe';
import { FavInfoComponent } from './components/fav-info/fav-info.component';
import { FavsPipe } from './pipes/favs.pipe';
import { UserFormComponent } from './components/user-form/user-form.component';



@NgModule({
  declarations: [
    UserInfoComponent,
    LetraApellidoPipe,
    FavInfoComponent,
    FavsPipe,
    UserFormComponent
  ],

  imports: [
    CommonModule,
    IonicModule
  ],
  
  exports: [
    IonicModule,
    CommonModule,
    UserInfoComponent,
    FavInfoComponent,
    FavsPipe,
    UserFormComponent
  ]
})
export class SharedModule { }
