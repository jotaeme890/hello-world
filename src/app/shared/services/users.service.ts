import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class UserNotFoundException extends Error {
}

export interface UserInterface{
  getAll():Observable<User[]>;
  getUser(id: number):Observable<User>;
  updateUser(user:User):Observable<void>;
  deleteUser(user:User):Observable<User[]>;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService implements UserInterface{

  id: number = 5
  private _user: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  public user$: Observable<User[]> = this._user.asObservable()

  constructor(private _http: HttpClient) { }
  
  getAll(): Observable<User[]> {
    return this._http.get<User[]>(environment.URL_BASE+"users").pipe(tap(users => {
      this._user.next(users)
    }))
  }

  getUser(id: number): Observable<User> {
    return new Observable(observer => {
      var user = this._user.value.find(user => user.id == id)
      if(user)
        observer.next(user)
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

  addUser(user: User):Observable<void>{
    return new Observable(observe => {
        var _users = [...this._user.value]
        user.id = ++this.id
        _users.push(user)
        this._user.next(_users)
        observe.next()
        observe.complete()
    })
    //return this._http.post<User>(environment.URL_BASE + "/users" + user)
  }

  deleteUser(user: User): Observable<User[]> {
    var userdel = this._http.delete<User[]>(environment.URL_BASE + "users/" + user.id).pipe(tap((result) => {
      this._user.next(result)
      this.getAll().subscribe()
    }))
    return userdel;
  }
}
