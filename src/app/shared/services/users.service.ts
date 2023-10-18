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
  updateUser(userId:number, user:User):Observable<User>;
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
    return this._http.get<User[]>(environment.URL_BASE+"users").pipe(tap(users => {
      this._user.next(users)
    }))
  }

  getUser(id: number): Observable<User> {
    return this._http.get<User>(environment.URL_BASE + "users/" + id).pipe(tap())
  }

  updateUser(userId:number, user: User): Observable<User> {
    return this._http.patch<User>(environment.URL_BASE + `users/${userId}`, user).pipe(tap(_ => {
      this.getAll().subscribe()}
    ))
  }

  addUser(user: User):Observable<User[]>{
    return this._http.post<User[]>(environment.URL_BASE + "users/", user).pipe().pipe(tap(_ => {
      this.getAll().subscribe()
    }))
  }

  deleteUser(user: User): Observable<User> {
    return this._http.delete<User>(environment.URL_BASE + "users/" + user.id).pipe(tap(_ => {
      this.getAll().subscribe()
    }))
  }
}
