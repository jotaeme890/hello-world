import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from '../../interfaces/user';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent  implements OnInit {

  long = 0

  public myForm: FormGroup | any
  user: User = {
    id: 0,
    firstName: "",
    surname: "",
    descripcion: "",
    age: 0,
    fav: false
}

  constructor(private fb: FormBuilder, private _modal: ModalController, private _users: UsersService) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      age: new FormControl(''),
      description: new FormControl('')
    });
  }

  onApply(form: FormGroup) {
    this.long = Math.ceil(Math.random()*100+6)
    this.user.id = this.long
    this.user.firstName = form.value.name
    this.user.age = form.value.age
    this.user.descripcion = form.value.description
    this.user.surname = form.value.surname
    this.user.fav = false
    this._modal.dismiss(this.user,"apply")
  }
}
