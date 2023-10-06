import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserInfoFavClicked } from './userInfoFavClicked';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})

export class UserInfoComponent implements OnInit{
  // SI AQUI HACEMOS UN SETTER Y UN GETTER, PODRIAMOS EJECUTAR CODIGO CUANDO RECIBIMOS EL VALOR 
  @Input() usuario?: {
    id:number
    firstName?: string
    surname?: string
    age: number
    fav: boolean
  }
  
  @Output() onFavClicked:EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>
  @Output() onCardClicked:EventEmitter<void> = new EventEmitter<void>
  @Output() onTrashClicked:EventEmitter<void> = new EventEmitter<void>

  onFavClick(event: any){
    this.onFavClicked.emit({
      fav:!(this.usuario?.fav??false)
    })
    event.stopPropagation();
  }

  onTrashClick(event:any){
    this.onTrashClicked.emit()
    event.stopPropagation();
  }

  abrirUsuario(event:any){
    this.onCardClicked.emit()
    event.stopPropagation();
  }

  constructor() {}
  ngOnInit(){
  }
}
