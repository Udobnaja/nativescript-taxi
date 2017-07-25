import {Component, OnInit} from "@angular/core";
import { Page } from "ui/page";
import {Config} from "../../shared/config";
import {RouterExtensions} from "nativescript-angular";
import {User} from "../../shared/user/user.class";

@Component({
    selector: "card",
    templateUrl: "pages/card-info/card-info.html",
    styleUrls: ["pages/card-info/card-info-common.css", "pages/card-info/card-info.css"],
})

export class CardInfoComponent implements OnInit {
    user: User;

    constructor(private page: Page,
                private router: RouterExtensions){

        this.user = new User();
        this.user.signal = "01002";
        this.user.name = "Мария Ивановна Петрова"

    }

    goToSettings(){
        this.router.navigate(["/settings"]);
    }

    goToWithdrawal(){
        this.router.navigate(["/withdrawal"]);
    }

    ngOnInit(){
        this.page.androidStatusBarBackground = Config.ActionBarColor;

        /* get user info from server */
    }
}