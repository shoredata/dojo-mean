import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-pdetails',
    templateUrl: './pdetails.component.html',
    styleUrls: ['./pdetails.component.css']
})
export class PdetailsComponent implements OnInit {

    myid: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
    ) { }

    ngOnInit() {
        // this._route.parent.params.subscribe((params: Params) => console.log("A:", `The parent params: ${params}`))
        this._route.parent.params.subscribe((params: Params) => console.log("A:", "parent params: ", params))
        this._route.params.subscribe((params: Params) => console.log("B:", params['id']));
        this._route.params.subscribe((params: Params) => this.myid = params['id']);

        //     let observable = this._httpService.postNewTask(this.newTask);
        //     observable.subscribe(data => {
        //         console.log("New Task:", data);
        //         this.selectedTask = data;
        //         //since we modified a task refresh the list of all tasks
        //         this.getTasksFromService();
        //     })    
    }



}
