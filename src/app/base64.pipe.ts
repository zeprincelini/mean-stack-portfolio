import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "base64"
})

export class Base64 implements PipeTransform{
    constructor(){}
    transform(value:any){
     return btoa(value);
 }
}