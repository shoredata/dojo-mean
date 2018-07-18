import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
    ) { }

  ngOnInit() {
      
  }

}
