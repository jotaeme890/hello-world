import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FavsService } from 'src/app/shared/services/favs.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-fav-info',
  templateUrl: './fav-info.component.html',
  styleUrls: ['./fav-info.component.scss'],
})
export class FavInfoComponent  implements OnInit {
  
  @Input() id:number | undefined
  usuario!: User

  constructor(public favs: FavsService, public user: UsersService) { }

  ngOnInit() {
    this.user.user$.subscribe(observe =>{
      let user:User | undefined  = observe.find(u => this.id == u.id)
      if(user)
        this.usuario = user
    })
  }

  @Output()   onTrashClickedFav:EventEmitter<void> = new EventEmitter<void>

  deleteClick (event: any){
    this.onTrashClickedFav.emit()
    event.stopPropagation();
  }
}
