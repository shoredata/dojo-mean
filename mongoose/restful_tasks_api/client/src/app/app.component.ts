import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'HELLO THIS IS IN CLIENT/SRC/APP/APP.COMPONENT.TS';

    num: number;
    randNum: number;
    str: string;
    first_name: string;

    snacks: string[];
    loggedIn: boolean;

  
    tasks = [];

    requested = {};
    has_requested = false;

  
    constructor(private _httpService: HttpService){ }

    // ngOnInit will run when the component is initialized, after the constructor method.
    ngOnInit(){
        this.getTasksFromService();

        this.num = 7;
        this.randNum = Math.floor( (Math.random()  * 2 ) + 1);
        this.str = 'Hello Angular Developer!';
        this.first_name = 'Alpha';
        this.snacks = ["vanilla latte with skim milk", "brushed suede", "cookie"];
        this.loggedIn = true;

    }

    getTasksFromService(){
        let observable = this._httpService.getTasks();
        observable.subscribe(data => {
            this.tasks = <Array<any>>data; //data['tasks'];

            // ^^ this is our return, I need it to cast data['tasks'] to an array before
            //  I can do anything on order to prevent ts errors (in addition to linter errors)
            // NOTE: .tasks is externally available to the rest of the app component!!!

            console.log("Got our tasks!", this.tasks)
            console.log("data.length: ", this.tasks.length)
            
            var myjson = JSON.stringify(this.tasks);
            var mystr = JSON.parse(myjson);
            console.log("JSON", myjson);
            console.log("stringify", mystr);

            // for (var d =0; d < data['tasks'].length; d++) {
            //     console.log (d, "data['tasks'][d]: ", data['tasks'][d].description, data['tasks'][d].title);

            // }
            // In this example, the array of tasks is assigned to the key 'tasks' in the data object. 
            // This may be different for you, depending on how you set up your Task API.
        });
    }


    onButtonClick(): void { 
        console.log(`Click event is working`);
        console.log(`Mouse is `, this.loggedIn);
    }
    onButtonClickParam(num: Number): void { 
        console.log(`Click event is working with num param: ${num}`);
    }
    onButtonClickParams(num: Number, str: String): void { 
        console.log(`Click event is working with num param: ${num} and str param: ${str}`);
    }
    onButtonClickEvent(event: any): void { 
        console.log(`Click event is working with event: ${event}`);
    }    

    onButtonClickToServer(num: Number, str: String): void { 
        this.has_requested = false;
        console.log(`Click event is working with num param: ${num}`);
        // call the service's method to post the data, but make sure the data is bundled up in an object!
        let data_tx = {
            title: "NUM: " + num.toString + "-" + str,
            description: "this was created by passing data to onButtonClickToServer()"
        };
        let observable = this._httpService.postNewTaskToServer(data_tx);
        observable.subscribe(data => {
            console.log("Got our data!", data);
            this.requested = data;
            this.has_requested = true;
        })
    }
    


    mouseEnter(div : string){
        console.log("mouse enter : " + div);
        this.loggedIn  = true;
    }

    mouseLeave(div : string){
        console.log('mouse leave :' + div);
        this.loggedIn  = false;
    }    


}


