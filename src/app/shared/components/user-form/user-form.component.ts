import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent  implements OnInit {

  constructor(private _modal: ModalController) { }

  ngOnInit() {}
  
  onApply(){
    var user: User = {
      id: 10,
      firstName: "Pablo",
      surname: "Picapiedra",
      descripcion: "Un tío serio",
      age: 123456,
      fav: false
    }
    this._modal.dismiss(user,"apply")
  }
}
