import { Component, OnInit } from "@angular/core";

import { Config } from "../../modules/core/config";
import * as appversion from "nativescript-appversion";
import { RouterExtensions } from "nativescript-angular";
import { isEnabled, enableLocationRequest } from "nativescript-geolocation";
import * as app from "tns-core-modules/application";

declare var android: any;


@Component({
    selector: "settings",
    templateUrl: "pages/settings/settings.html",
    styleUrls: ["pages/settings/settings-common.css", "pages/settings/settings.css"],
})

export class SettingsComponent implements OnInit {
    public ver:string;
    public islocationEnabled:boolean = isEnabled();

    constructor(private router: RouterExtensions){}

    logout(){
        this.router.navigate(["login"], { clearHistory: true });
    }

    goBack():void{
        this.router.back();
    }

    goToWebView(title: string, link:string):void{
        this.router.navigate(["webview"], {
            queryParams: {
                title: title,
                link:  link
            }
        })
    }

    goToPrivacyPolicy(args){
        this.goToWebView(args.object.text, Config.PrivacyPolicyLink);
    }

    goToTermOfUse(args){
        this.goToWebView(args.object.text, Config.TermOfUseLInk);
    }

    toggleLocationPermissions(){
        if (!isEnabled()) {

            enableLocationRequest().then(()=> {
                console.log('everything fun');
            }).catch(e => console.dir(e));
        } else {
            if (app.android) {
                let intent = new android.content.Intent(android.provider.Settings.ACTION_SETTINGS);
                app.android.context.startActivity(intent); /* android.settings.SETTINGS */
            }
        }
    }

    ngOnInit(){
        appversion.getVersionName().then(v => this.ver = v);
    }
}