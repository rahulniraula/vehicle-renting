import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSetPrice]'
})
export class SetPriceDirective {

  @HostListener('dblclick') dblClick(){
    console.log('clicked');
  }
  constructor() { }

}
