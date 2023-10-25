import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom, map, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class UserNotFoundException extends Error {
}

export interface UserInterface{
  getAll():Observable<User[]>;
  getUser(id: number):Observable<User>;
  updateUser(user:User):Observable<User>;
  deleteUser(user:User):Observable<User>;
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
    return this._http.get<User[]>(environment.URL_BASE+"users").pipe(tap((users:any[]) => {
      this._user.next(users)
    })) 
    /*return this._http.get<User[]>(environment.URL_BASE+"users").pipe(map((user:any[]) => {
        return user.map((users:any) => {
          return {
            id: users.id,
            firstName: users.firstName,
            surname: users.surname,
            descripcion: users.descripcion,
            age: users.age
          }
        })
    }))*/
  }

  getUser(id: number): Observable<User> {
    return this._http.get<User>(environment.URL_BASE + `users/${id}`).pipe(tap())
  }

  updateUser(user: any): Observable<User> {
    return new Observable<User>(obs => {
      this._http.patch<User>(environment.URL_BASE + `users/${user.id}`, user).subscribe(_ => {
        this.getAll().subscribe( _ => {
          this.getUser(user.id).subscribe( _user => {
            obs.next(_user)
          })
        })
      })
    })
  }

  addUser(user: User):Observable<User>{
    // TENEMOS QUE BORRAR EL ID PARA POSIBLES FALLOS FUTUROS
    var _users: any = {
      firstName: user.firstName,
      surname: user.surname,
      descripcion: user.descripcion,
      age: user.age,
    }
    return this._http.post<User>(environment.URL_BASE + "users/", _users).pipe(tap(_ => {
      this.getAll().subscribe()
    }))
  }

  deleteUser(user: User): Observable<User> {
    /* return this._http.delete<any>(environment.URL_BASE + `users/${user.id}`).pipe(tap(_ => {
      this.getAll().subscribe()
    })) */

    /* return this._http.delete<User>(environment.URL_BASE + `users/${user.id}`).pipe(tap(async _ => {
      await lastValueFrom(this.getAll())
    })) */

    return new Observable<User>(obs => {
      this._http.delete<User>(environment.URL_BASE + `users/${user.id}`).subscribe( _ => {
        this.getAll().subscribe(_ => {
          obs.next(user)
        })
      })
    })
  }
}
