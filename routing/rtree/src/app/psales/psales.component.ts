import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
    selector: 'app-psales',
    templateUrl: './psales.component.html',
    styleUrls: ['./psales.component.css']
})
export class PsalesComponent implements OnInit {
    

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
    ) { }

    ngOnInit(){
        // note the use of .parent
        this._route.parent.params.subscribe((params: Params) => console.log("C:", "parent params: ", params))
        this._route.params.subscribe((params: Params) => console.log("D:", params['id']));
    }

}
