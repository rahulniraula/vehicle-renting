import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div style="background-color: rgb(19, 52, 241);color:white;padding:2px 10px;">
        <div class="row">
            <div class="col-6">
                <h2>Add Vehicle</h2>
            </div>
            <div class="col-6">
                <button type="button" class="btn btn-primary btn-floating pull-right mt-1">
                    <i class="fa fa-list"></i>
                  </button>
            </div>
        </div>
    </div>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
