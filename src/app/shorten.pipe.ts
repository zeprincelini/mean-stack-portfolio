import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "shorten"
})

export class ShortenPipe implements PipeTransform{
    constructor(){}
    transform(value:any){
     return value.substr(0, 15);
 }
}