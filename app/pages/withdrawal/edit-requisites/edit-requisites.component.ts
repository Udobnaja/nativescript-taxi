import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "edit-requisites",
    templateUrl: "pages/withdrawal/edit-requisites/edit-requisites.html"
})

export class EditRequisitesComponent implements OnInit {

    constructor(private router: RouterExtensions){

    }

    ngOnInit(){

    }

    goBack(){
        this.router.back();
    }

}