import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _user: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([])
  public user$: Observable<Todo[]> = this._user.asObservable()

  constructor() { }

  getAll(): Observable<Todo[]> {
    
    return new Observable(users => {
        let usuarios: Todo[] = [
          {
            userId : 0,
            tarea: "Hacer la Cama",
          },
        ]
        this._user.next(usuarios);
        users.next(usuarios);
        users.complete();
    })
  }
}
