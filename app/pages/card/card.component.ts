import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { Config } from "../../modules/core/config";
import { User } from "../../shared/models/user/user.class";
import { Router } from "@angular/router";

import { IUser } from "../../shared/models/user/user.model";
import { NUser } from "../../modules/state-managment/actions/user.action";
import { Store } from "@ngrx/store";
import { IAppState } from "../../modules/ngrx/index";
import { Observable } from "rxjs";
import * as dialogs from "ui/dialogs";
declare var android: any;
import * as application from "tns-core-modules/application";

import { isEnabled, enableLocationRequest } from "nativescript-geolocation";

@Component({
    selector: "card",
    templateUrl: "./card.html",
    styleUrls: ["./card-common.css"],
})

export class CardInfoComponent implements OnInit {
    user: IUser;
    user$: Observable<any>;
    public isLoading: boolean = true;

    constructor(private page: Page,
                private router: Router,
                private store: Store<IAppState>) {

         this.user = new User();
         this.user$ = this.store.select("user");

         this.user$.subscribe(e => {
             if (e) {
                 this.isLoading = false;
                 this.user.balance = Number(e.balance).toFixed(2);
                 this.user.signal = e.signal;
                 this.user.name = e.name;
             }
         }, e =>  dialogs.alert({
             title: Config.messages.error.title,
             message: e.message,
             okButtonText: Config.messages.button.ok
         }));
    }

    goToSettings() {
        this.router.navigate(["settings"]);
    }

    goToWithdrawal() {
        this.router.navigate(["withdrawal"]);
    }

    private startBackgroundService() {
        let context = application.android.context;
        let intent = new android.content.Intent();
        intent.setClassName(context, "com.tns.BackgroundGPSService");
        context.startService(intent);
    }

    ngOnInit() {

        this.store.dispatch(new NUser.LoadAction()); /* this is dispatcher for loading user */

        this.page.androidStatusBarBackground = Config.actionBarColor;

        isEnabled()
            .then(hasAccess => {
                if (!hasAccess) {
                    enableLocationRequest()
                        .then(() => {
                            this.startBackgroundService();
                        }, (e) => {
                            this.startBackgroundService();
                            console.log("Error Decline Request: " + (e.message || e));
                        });
                } else {
                    this.startBackgroundService();
                }
            }, (e) => {
                console.log("Error is Enabled: " + (e.message || e));
            });
    }
}
