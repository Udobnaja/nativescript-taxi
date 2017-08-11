import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { Page } from "ui/page";
import {Config} from "../../modules/core/config";

@Component({
    selector: "agreement-content",
    templateUrl: "pages/agreement/agreement.html",
    styleUrls: ["pages/agreement/agreement-common.css", "pages/agreement/agreement.css"],
})

export class AgreementComponent implements OnInit{
    content: string = "";

    constructor(private router: Router, private page: Page){

    }

    ngOnInit(){
        this.page.androidStatusBarBackground = Config.ActionBarColor;
        /* In this place get confidential */
        this.content = "<h1>Политика Конфиденциальности</h1><span color='#000'>Test</span>";

    }

    close(){
        this.router.navigate(["login"]);
    }

    goNext(){
        /* in this place post accept to server for this user */
        this.router.navigate(["card-info"]);
    }

}