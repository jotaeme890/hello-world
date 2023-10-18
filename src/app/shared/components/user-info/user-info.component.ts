import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserInfoFavClicked } from './userInfoFavClicked';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})

export class UserInfoComponent implements OnInit{
  // SI AQUI HACEMOS UN SETTER Y UN GETTER, PODRIAMOS EJECUTAR CODIGO CUANDO RECIBIMOS EL VALOR 
  @Input() usuario:User | null=null
  /* IMPLEMENTANDO SETTERS Y GETTERS, SERIA
  private _id:number = 0
  private _firstName: string = ""
  private _surname: string = ""
  private _descripcion: string = ""
  private _age: number = 0
  private fav: boolean = false
  
  @Input
  get id(): number {
    return this._id
  }
  set id(new_id: number) {
    this._id = new_id
  }
  
  Y ASI CON EL RESTO DE ATRIBUTOS
  */
  
  @Output() onFavClicked:EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>
  onFavClick(event: any){
    this.onFavClicked.emit({
      fav:!(this.usuario?.fav??false)
    })
    event.stopPropagation();
  }
  
  @Output() onTrashClicked:EventEmitter<void> = new EventEmitter<void>
  onTrashClick(event:any){
    this.onTrashClicked.emit()
    event.stopPropagation();
  }
  
  @Output() onCardClicked:EventEmitter<void> = new EventEmitter<void>
  abrirUsuario(event:any){
    this.onCardClicked.emit()
    event.stopPropagation();
  }

  constructor() {}
  ngOnInit(){
  }
}
