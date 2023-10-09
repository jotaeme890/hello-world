import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../shared/components/user-info/user';
import { Fav } from './fav';

@Pipe({
  name: 'favs'
})
export class FavsPipe implements PipeTransform {

  transform(users: User[] | null, favs: Fav[] | null): User[] {
    let _users: User[] = [...users ?? []]
    if(favs)
      _users = _users.map( u => {
        return{
          id: u.id,
          firstName: u.firstName,
          surname: u.surname,
          descripcion: u.descripcion,
          age: u.age,
          fav: favs.reduce((p,f) => p || f.userId == u.id, false)
        }
      })
    return _users
  }

}
