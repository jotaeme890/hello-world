import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user';
import { Fav } from '../interfaces/fav';

@Pipe({
  name: 'favs'
})
export class FavsPipe implements PipeTransform {

  transform(users: User[] | null, favs: Fav[] | null): User[] {
    var _users = null
    if (users && Array.isArray(users))
      _users = [...users];
    if(favs && _users)
      _users = _users.map( u => {
        return{
          id: u.id,
          firstName: u.firstName,
          surname: u.surname,
          descripcion: u.descripcion,
          age: u.age,
          picture: u.picture,
          fav: favs.reduce((p,f) => p || f.userId == u.id, false)
        }
      })
    if (_users) {
      return _users
    }
    return []
  }

}
