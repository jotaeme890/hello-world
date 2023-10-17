import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent  implements OnInit {

  @Input() mode:"New"|"Edit" = "New"
  @Input() set user(_user: User | null){
    if(_user){
      this.form.controls['id'].setValue(_user.id)
      this.form.controls['firstName'].setValue(_user.firstName)
      this.form.controls['surname'].setValue(_user.surname)
      this.form.controls['descripcion'].setValue(_user.descripcion)
      this.form.controls['age'].setValue(_user.age)
    }
  }

  form: FormGroup
  todo: boolean
  constructor(
    private modal: ModalController,
    private formBuilder: FormBuilder,
    public plataforma: Platform
  ) { 
    this.form = this.formBuilder.group({
      id: [null],
      firstName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      age: [0, [Validators.required]],
    })
    this.todo = false
  }

  ngOnInit() {}


  onCancel(){
    this.modal.dismiss(null,"cancel")
  }

  onSubmit(){
    this.modal.dismiss(this.form.value,"submit")
  }

  onDelete(){
    this.modal.dismiss(this.form.value,"delete")
  }
}
