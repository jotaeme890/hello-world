import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { UsersService } from '../services/users.service';
import { UserInfoFavClicked } from '../shared/components/user-info/userInfoFavClicked';
import { ToastController, ToastOptions } from '@ionic/angular';
import { FavsService } from '../services/favs.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit{

  public loading = true;

  constructor(private _route: Router, public users:UsersService, public toast: ToastController, public favs: FavsService) {}

  ngOnInit(): void {
    this.loading = true;
    zip(this.users.getAll(), this.favs.getAll()).subscribe(u => {
      this.loading = false;
    });
  }

  onFavClick(user: User, event: UserInfoFavClicked){
    let obs = (event?.fav)?this.favs.addFav(user.id):this.favs.deleteFav(user.id);
    obs.subscribe(
      {
        next: _ => {
          const op:ToastOptions = {
            message: `El usuario ${user.firstName} ${user.surname} ha sido ${event.fav?'añadido':'eliminado'} de favoritos`,
            position: 'bottom',
            color: 'danger',
            duration: 1000
          }
          this.toast.create(op).then(t => t.present())
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }

  onCardClick(user: User){
    var _user: User = {...user}
    this.users.getUser(_user.id).subscribe(
      {
        next: u => {
          const op:ToastOptions = {
            message: `${u.descripcion}`,
            position: 'bottom',
            duration: 5000
          }
          this.toast.create(op).then(t => t.present())
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }

  onTrashClick(user: User){
    var _user: User = {...user}
    this.users.deleteUser(_user).subscribe(
      {
        next:u => {
          const op:ToastOptions = {
            message: `Usario eliminado`,
            position: 'bottom',
            color: 'danger',
            duration: 1000
          }
          this.toast.create(op).then(t => t.present())
        },
        error: err => {
          console.log(err);
        }
      }
      )
  }

  welcome() {
    this._route.navigate(["./welcome"])
  }
}
 