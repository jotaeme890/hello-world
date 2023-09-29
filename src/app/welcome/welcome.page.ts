import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  id?: number
  nombre?: string

  constructor(private _route1:ActivatedRoute, private _route2:Router) {}

  ngOnInit() {
  }

  home(){
    this._route2.navigate(["/home"])
  }

  iniciarSesion(){
    let usuario = document.getElementById("usu") as HTMLElement
    let nombre = document.getElementById("nombre") as HTMLInputElement
    let apellido = document.getElementById("apellido") as HTMLInputElement
    if(nombre.value != "" && apellido.value != "")
      usuario.innerHTML = `<p class="usu" >${nombre.value} ${apellido.value}</p>`
    else
      usuario.innerHTML = `<h1 style="color:red">Ponga bien los datos</h1>`
  }
}
