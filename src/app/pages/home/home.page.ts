import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { UsersService } from '../../shared/services/users.service';
import { UserInfoFavClicked } from '../../shared/components/user-info/userInfoFavClicked';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { FavsService } from '../../shared/services/favs.service';
import { zip } from 'rxjs';
import { Fav } from '../../shared/interfaces/fav';
import { UserDetailComponent } from 'src/app/shared/components/user-detail/user-detail.component';

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
    zip(this.users.getAll(), this.favs.getAll()).subscribe({
      next: _ => {this.loading = false},
      error: err => {console.log(err)}
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
    var onDismiss = ((data:any) => {
      switch(data.role){
        case 'submit':{
          this.users.updateUser(data.data).subscribe(
            {
              next: u => {
                const op:ToastOptions = {
                  message: `Usuario modificado`,
                  position: 'bottom',
                  duration: 2000
                }
                this.toast.create(op).then(t => t.present())
              },
              error: err => {
                console.log(err);
              }
            }
          )
        }
        break;
        case "delete":{
          zip(this.favs.deleteFav(data.data.id),this.users.deleteUser(data.data)).subscribe()
        }
        break;
        default: {
          console.error("No debería entrar");
        }
      }
    })
    this.abrirForm(user,onDismiss)
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

  // Va a recibir un parametro User, si nos pasan un usuario significa que vamos a crear un usuario, si lo pasamos es para modificar un usuario
  abrirForm(data:User | null, onDissmiss:((result:any) => void)){
    const modal = this.modal.create( {
      component: UserDetailComponent,
      componentProps: {
        mode:data?"Edit":"New",
        user:data
      }
    }).then(pantalla => {
      pantalla.present();
      pantalla.onDidDismiss().then(result => {
        if(result && result.data)
          onDissmiss(result)
      })
    })
  }

  onNewUser(){
    var onDismiss = ((data:any) => {
      switch(data.role){
        case 'submit':{
          console.log(data.data);
          this.users.addUser(data.data).subscribe(
            {
              next: u => {
                const op:ToastOptions = {
                  message: `Usuario creado`,
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
        break;
        default: {
          console.error("No debería entrar");
        }
      }
    })
    this.abrirForm(null,onDismiss)
  }
}
 