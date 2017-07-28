import {Component, OnInit} from "@angular/core";
import { Page } from "ui/page";
import {Config} from "../../modules/core/config";
import {User} from "../../shared/user/user.class";
import {Router} from "@angular/router";
import {UserService} from "../../shared/user/user.service";
import {IUser} from "../../shared/user/user.model";
import {NUser} from "../../modules/state-managment/actions/user.action";
import {Store} from "@ngrx/store";
import {IAppState} from "../../modules/ngrx/index";
import {Observable} from "rxjs";


@Component({
    selector: "card",
    templateUrl: "pages/card-info/card-info.html",
    styleUrls: ["pages/card-info/card-info-common.css", "pages/card-info/card-info.css"],
    providers: [UserService]
})

export class CardInfoComponent implements OnInit {
    user:IUser;
    user$:Observable<any>;

    constructor(private page: Page,
                private router: Router,
                private store: Store<IAppState>){

         this.user = new User();
         this.user$ = this.store.select("user");

         this.user$.subscribe( e => {
             if (e){
                 this.user.balance = Number(e.balance).toFixed(2);
                 this.user.signal = e.signal;
                 this.user.name = e.name;
             }
         });
    }

    goToSettings(){
        this.router.navigate(["/settings"]);
    }

    goToWithdrawal(){
        this.router.navigate(["/withdrawal"]);
    }

    ngOnInit(){
        this.store.dispatch(new NUser.LoadAction()); /* this is dispatcher for loading user */

        this.page.androidStatusBarBackground = Config.ActionBarColor;
    }
}