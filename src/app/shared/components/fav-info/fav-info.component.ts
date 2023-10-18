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
  private _id: number = 0
  public user: User | null

  @Input() set id(new_id:number){
    this._id = new_id
    if(this._id != 0){
      this.users.getUser(this._id).subscribe(u => {
        this.user = u
      })
    }
  }

  get id():number{
    return this._id
  }

  constructor(public favs: FavsService, public users: UsersService) { this.user = null }

  ngOnInit() {}

  @Output()   onTrashClickedFav:EventEmitter<void> = new EventEmitter<void>

  deleteClick (event: any){
    this.onTrashClickedFav.emit()
    event.stopPropagation();
  }
}
