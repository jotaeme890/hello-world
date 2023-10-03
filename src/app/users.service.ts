import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './home/user';

export class UserNotFoundException extends Error {
}

export interface UserInterface{
  getAll():Observable<User[]>;
  getUser(id: number):Observable<User>;
  updateUser(user:User):Observable<void>;
  deleteUser(user:User):Observable<User>;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService implements UserInterface{

  private _user: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  public user$: Observable<User[]> = this._user.asObservable()

  constructor() { }
  
  getAll(): Observable<User[]> {
    
    return new Observable(users => {
      //  Para que tarde en cargar y podamos usar ion-loading
      setTimeout(() => {
        let usuarios: User[] = [
          {
            id : 0,
            firstName: "Pepe",
            surname: "Viyuela",
            descripcion:"Actor muy conocido es España, siendo partícipe en muchas series con gran peso en su país.",
            age: 60,
            fav: false
          },
          {
            id : 1, 
            firstName: "Javier Miguel",
            surname: "Martín Gallardo",
            descripcion:"Un chaval que estudia un grado superior de programación",
            age: 19,
            fav: false
          },
          {
            id : 2,
            firstName: "Adrián",
            surname: "Perogil Fernández",
            descripcion:"Un hombre que ha vivido con los dinosaurios",
            age: 25_000_000,
            fav: false
          },
          {
            id : 3,
            firstName: "Pedro",
            surname: "Sánchez",
            descripcion:"Un hombre que no hace nada",
            age: 47,
            fav: false
          }
        ]
        this._user.next(usuarios);
        users.next(usuarios);
        // Acaba el observador
        users.complete();
      }, 2000)
    })
  }

  getUser(id: number): Observable<User> {
    return new Observable(observer => {
      var user = this._user.value.find(user => user.id == id)
      if(user)
        observer.next(user)
      else
        observer.error(new UserNotFoundException)
      observer.complete()
    })
  }

  updateUser(user: User): Observable<void> {
    return new Observable(observe => {
      // Obtengo el array
      let _users = [...this._user.value]
      // Indice del usuarios con esa id
      let i = _users.findIndex(u => u.id == user.id )
      if(i != -1){
        // Modifico la posicion con el usuario que me pasan
        _users[i] = user
        // Para que me pueda subscribir en el otro lado necesito hacer el .next()
        observe.next()
        // Actualizo el BehaviourSubject
        this._user.next(_users)
      } else
        observe.error(new UserNotFoundException())
      // Acaba el observador
      observe.complete()
    })
  }

  deleteUser(user: User): Observable<User> {
    return new Observable(observe => {
      setInterval(() => {
        var _users = [...this._user.value]
        var i = _users.findIndex(u => u.id == user.id)
        if(i != -1){
          _users.splice(i,1)
          // _users = [..._users.slice(0,index),..._users.slice(index+1)];
          observe.next()
          this._user.next(_users)
        } else
          observe.error(new UserNotFoundException())
      },500)
    })
  }
}
