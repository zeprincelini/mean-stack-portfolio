import {Directive, HostListener} from "@angular/core";

@Directive ({
    selector: '[Hover]'
})

export class HoverDirective{
    isHovering: boolean = false;

    @HostListener('mouseenter') mouseEnter(){
        this.isHovering = !this.isHovering;
    }

    @HostListener('mouseleave') mouseLeave(){
        this.isHovering != true;
    }
}