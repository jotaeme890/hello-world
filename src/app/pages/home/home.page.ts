import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { UsersService } from '../../shared/services/users.service';
import { UserInfoFavClicked } from '../../shared/components/user-info/userInfoFavClicked';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { FavsService } from '../../shared/services/favs.service';
import { zip } from 'rxjs';
import { Fav } from '../../shared/interfaces/fav';
import { UserFormComponent } from 'src/app/shared/components/user-form/user-form.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit{

  public loading = true;

  constructor(public users:UsersService, public toast: ToastController, public favs: FavsService, public modal: ModalController) {}

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
            duration: 3000,
            buttons: [
              {
                text:"Revertir",
                handler: () => {
                  this.revertirCambios(user.id, event.fav)
                } 
              }
            ]
          }
          this.toast.create(op).then(t => t.present())
        },
        error: err => {
          console.log(err);
        }
      }
      )
    }

    revertirCambios(idUsu: number, esFav: boolean | undefined){
      let obs = !esFav ? this.favs.addFav(idUsu) : this.favs.deleteFav(idUsu);
      obs.subscribe()
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
    zip(this.favs.deleteFav(user.id),this.users.deleteUser(_user)).subscribe(
      {
        next:u => {
          const op:ToastOptions = {
            message: `El usuario ${user.firstName} ${user.surname} ha sido borrado`,
            position: 'bottom',
            color: 'danger',
            duration: 1000,
            
          }
          this.toast.create(op).then(t => t.present())
        },
        error: err => {
          console.log(err);
        }
      }
    )
  }


  onTrashClickFav(fav: Fav){
    var _fav: Fav = {...fav}
    if(_fav)
      this.favs.deleteFav(_fav.userId).subscribe(
        {
          next:u => {
            const op:ToastOptions = {
              message: `Favorito eliminado`,
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

  abrirForm(onDissmiss:((result:any) => void)){
    const modal = this.modal.create( {
      component: UserFormComponent,
      cssClass: "modal"
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(result => {
        if(result && result.data)
          onDissmiss(result.data)
      })
    })
  }

  onNewUser(newUser: any){
    var onDismiss = ((data:any) => {
      this.users.addUser(data).subscribe()
    })
    this.abrirForm(onDismiss)
  }
}
 