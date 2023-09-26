import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { usuarios } from "../models/usuarios"


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuarios = usuarios
  constructor(private _route: Router) {}

  welcome() {
    this._route.navigate(["./welcome"])
  }
}
