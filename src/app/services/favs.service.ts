import { Injectable } from '@angular/core';
import { Fav } from '../shared/interfaces/fav';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root' // Esto se hace para que sea accesible de manera global
})
export class FavsService {

  private _fav: BehaviorSubject<Fav[]> = new BehaviorSubject<Fav[]>([])
  public fav$: Observable<Fav[]> = this._fav.asObservable()

  constructor() { }

  getAll(): Observable<Fav[]>{
    return new Observable(observer => {
      setTimeout(() => {
        let favs: Fav[] = [
         {userId: 1},
         {userId: 3},
        ]
        observer.next(favs)
        this._fav.next(favs)
        observer.complete()
      },3000)
    })
  }

  addFav(uId: number): Observable<void>{
    return new Observable(observer => {
      let _favs = [...this._fav.value]
      if(uId >= 0){
        _favs.push({userId:uId})
        observer.next()
        this._fav.next(_favs)
      } else{
        observer.next()
        this._fav.next(_favs)
      }
      observer.complete()
    })
  }

  deleteFav(uId: number | undefined): Observable<void>{
    return new Observable(observer => {
      let _favs = [...this._fav.value]
      let i = _favs.findIndex(u => u.userId == uId)
      if(i != -1){
        _favs.splice(i,1)
        observer.next()
        this._fav.next(_favs)
      } else{
        observer.next()
        this._fav.next(_favs)
      }
      observer.complete()
    })
  }
}

