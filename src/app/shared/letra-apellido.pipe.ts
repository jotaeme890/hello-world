import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letraApellido'
})
export class LetraApellidoPipe implements PipeTransform {

  transform(apellido?:string): string | undefined {
    if(apellido != ''){
      return apellido?.charAt(0).toUpperCase()
    } else return ''
  }

}
