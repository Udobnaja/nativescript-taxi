import {Component, OnInit} from "@angular/core";
import {Color} from "tns-core-modules/color";

import { Page } from "ui/page";
import {Router} from "@angular/router";
import {Config} from "../../shared/config";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "card",
    templateUrl: "pages/card-info/card-info.html",
    styleUrls: ["pages/card-info/card-info-common.css", "pages/card-info/card-info.css"],
})

export class CardInfoComponent implements OnInit {
    constructor(private page: Page,
                private router: RouterExtensions){

    }

    goToSettings(){
        this.router.navigate(["/settings"], {
            transition: {
                name: "slide",
                duration: 500,
                curve: "linear"
            }
        });
    }

    goToWithdrawal(){
        this.router.navigate(["/withdrawal"]);
    }

    ngOnInit(){
        this.page.androidStatusBarBackground = Config.ActionBarColor;
    }
}