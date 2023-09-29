import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UserInfoFavClicked } from './user-info/userInfoFavClicked';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit{
  
  private _user: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  user$: Observable<User[]> = this._user.asObservable()

  constructor(private _route: Router, private _toast: ToastController) {}

  ngOnInit(): void {
    let index = 0
    let usuarios: User[] = [
      {
        id : 0,
        firstName: "Pepe",
        surname: "Viyuela",
        age: 60,
        fav: true
      },
      {
        id : 1, 
        firstName: "Javier Miguel",
        surname: "Martín Gallardo",
        age: 19,
        fav: false
      },
      {
        id : 2,
        firstName: "Adrián",
        surname: "Perogil Fernández",
        age: 25_000_000,
        fav: true
      },
      {
        id : 3,
        firstName: "Pedro",
        surname: "Sánchez",
        age: 47,
        fav: false
      }
    ]
    
    setInterval(() => {
      if(index < usuarios.length){
        // .value ES COMO HACER UNA SUBSCRIPCION DIRECTA, Y AHORRAS LINEAS
        let usu: User[] = this._user.value
        usu.push(usuarios[index])
        // next ES PARA QUE LAS SUBSCRIPCIONES RECIBAN LOS CAMBIOS
        this._user.next(usu)
        index++
      }
    },1000)
  }

  onFavClicked(user: User, event: UserInfoFavClicked){
   const users = [...this._user.value];
   var index = users.findIndex(_user => _user.id === user.id);
   if(index >= 0)
    users[index].fav = event.fav??false;
   this._user.next([...users]);
   
   const options:ToastOptions = {
    message:`${event.fav?`${user.firstName} ${user.surname} añadido`:`${user.firstName} ${user.surname} eliminado`} ${event.fav?'a':'de'} favoritos`, //mensaje del toast
    duration:2000, // 1 segundo
    position:'bottom', // el toast se situa en la parte inferior
    color:'danger', // color del toast
    cssClass:'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
   };
   this._toast.create(options).then(_toast=>_toast.present());
 }

  welcome() {
    this._route.navigate(["./welcome"])
  }
}
 