import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { UsersService } from '../users.service';
import { UserInfoFavClicked } from './user-info/userInfoFavClicked';
import { ToastController, ToastOptions } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit{

  public loading = true;

  constructor(private _route: Router, public users:UsersService, public toast: ToastController) {}

  ngOnInit(): void {
    this.loading = true;
    this.users.getAll().subscribe(u => {
      this.loading = false;
    });
  }

  onFavClick(user: User, event: UserInfoFavClicked){
    var _user: User = {...user}
    _user.fav = event.fav??false
    this.users.updateUser(_user).subscribe(
      {
        next: u => {
          const op:ToastOptions = {
            message: `El usuario ${_user.firstName} ${_user.surname} ha sido ${_user.fav?'añadido':'eliminado'} de favoritos`,
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

  onTrasClick(user: User){
    var _user: User = {...user}
    this.users.deleteUser(_user).subscribe(
      {
        next:u => {
          const op:ToastOptions = {
            message: `Uusario eliminado`,
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
 