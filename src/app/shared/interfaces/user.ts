export interface User{
    id: number,
    firstName: string,
    surname: string,
    descripcion: string,
    age: number,
    fav?:boolean,
    picture?: string
}