import {Component, OnInit} from "@angular/core";
import {Color} from "tns-core-modules/color";

import { Page } from "ui/page";
import {Router} from "@angular/router";
import {Config} from "../../shared/config";
import * as appversion from "nativescript-appversion";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "settings",
    templateUrl: "pages/settings/settings.html",
    styleUrls: ["pages/settings/settings-common.css", "pages/settings/settings.css"],
})

export class SettingsComponent implements OnInit {
    public ver:string;
    public isMessageEnabled:boolean = Config.messagePermissons;

    constructor(private page: Page,
                private router: RouterExtensions){
    }

    logout(){
        localStorage.removeItem("token");
        this.router.navigate(["/login"], { clearHistory: true });
    }

    toggleMessagePermissions(){ /* mb create observable on isMessageEnabled*/
        Config.messagePermissons = !this.isMessageEnabled;
    }

    ngOnInit(){
        this.page.androidStatusBarBackground = Config.ActionBarColor;
        appversion.getVersionName().then(v => this.ver = v);
    }
}