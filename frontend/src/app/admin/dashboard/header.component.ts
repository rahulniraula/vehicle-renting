import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div style="color:white;padding:2px 10px;" class="bg-primary">
        <div class="row">
            <div class="col-6">
                <h2>{{title}}</h2>
            </div>
            <div class="col-6">
            <a [routerLink]="route">
                <button type="button" class="btn btn-primary btn-floating pull-right mt-1">
                  
                    <i class="fa fa-{{icon}}"></i>
                    
                  </button>
                  </a>
            </div>
        </div>
    </div>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() route!: string[];
  @Input() icon!:string;
  constructor() { }

  ngOnInit(): void {
  }

}
