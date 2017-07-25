import {Component, OnInit} from "@angular/core";
import {Color} from "tns-core-modules/color";

import { Page } from "ui/page";
import {Router} from "@angular/router";
import {Config} from "../../shared/config";

@Component({
    selector: "card",
    templateUrl: "pages/card-info/card-info.html",
    styleUrls: ["pages/card-info/card-info-common.css", "pages/card-info/card-info.css"],
})

export class CardInfoComponent implements OnInit {
    constructor(private page: Page,
                private router: Router){

    }

    goToSettings(){
        this.router.navigate(["/settings"]);
    }

    goToWithdrawal(){
        this.router.navigate(["/withdrawal"]);
    }

    ngOnInit(){
        this.page.androidStatusBarBackground = Config.ActionBarColor;
    }
}