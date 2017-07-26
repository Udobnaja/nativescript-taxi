import {Component, OnInit} from "@angular/core";
import { Page } from "ui/page";
import {Config} from "../../shared/config";
import {User} from "../../shared/user/user.class";
import {Router} from "@angular/router";
import {UserService} from "../../shared/user/user.service";


@Component({
    selector: "card",
    templateUrl: "pages/card-info/card-info.html",
    styleUrls: ["pages/card-info/card-info-common.css", "pages/card-info/card-info.css"],
    providers: [UserService]
})

export class CardInfoComponent implements OnInit {
    user: User;

    constructor(private page: Page,
                private router: Router,
                private userService: UserService,){

        this.user = new User();
    }

    goToSettings(){
        this.router.navigate(["/settings"]);
    }

    goToWithdrawal(){
        this.router.navigate(["/withdrawal"]);
    }

    ngOnInit(){
        this.page.androidStatusBarBackground = Config.ActionBarColor;

        this.userService.getProfile().subscribe(({ signal, name, balance, date } : User)=>{
            this.user.signal = signal;
            this.user.name = name;
            this.user.balance = balance;
            this.user.date = date;
        });

        /* @TODO: create Requset -> get User Profile from server & subscribe */
    }
}