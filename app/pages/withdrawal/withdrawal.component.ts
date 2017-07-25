import {Component, OnInit} from "@angular/core";
import {Color} from "tns-core-modules/color";

import { Page } from "ui/page";
import {Router} from "@angular/router";
import {DatePicker} from "tns-core-modules/ui/date-picker";

import * as application from "application";
import * as platform from "platform";
import * as utils from "utils/utils";
import * as app from "tns-core-modules/application";
import {Config} from "../../shared/config";
import {RouterExtensions} from "nativescript-angular";

declare var android: any;

@Component({
    selector: "withdrawal",
    templateUrl: "pages/withdrawal/withdrawal.html",
    styleUrls: ["pages/withdrawal/withdrawal-common.css", "pages/withdrawal/withdrawal.css"],
})

export class WithdrawalComponent implements OnInit {
    constructor(private page: Page,
                private router: RouterExtensions){
    }

    goBack(){
        this.router.back();
    }

    onPickerLoaded(args){
        let datePicker = <DatePicker>args.object;
        let today = new Date();
        datePicker.year = today.getFullYear();
        datePicker.month = today.getMonth();
        datePicker.day = today.getDay();
        datePicker.minDate = today;
        let maxDate = today.setMonth(today.getMonth() + 3); /* + three month*/

        // let ch = datePicker.getIde;
        // console.log(ch);
        datePicker.maxDate = new Date(maxDate);


        // let appResources = android.content.res.Resources;
        //
        // let View = android.view.View;
        // let window = application.android.startActivity.getWindow();
        //
        // let res = android.content.res.Resources;
        // let system = res.getSystem();
        //
        // let id = system.getIdentifier("android:id/titleDivider", null, null);

        // console.log(hour_view);

    }

    ngOnInit(){


        this.page.androidStatusBarBackground = Config.ActionBarColor;
    }
}