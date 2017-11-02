import {Component, OnInit, NgZone} from "@angular/core";

import { Config } from "../../modules/core/config";
import * as appversion from "nativescript-appversion";
import { RouterExtensions } from "nativescript-angular";
import { isEnabled } from "nativescript-geolocation";
import * as app from "tns-core-modules/application";
import { on as applicationOn,
    resumeEvent,
    ApplicationEventData
} from "application";

declare var android: any;


@Component({
    selector: "settings",
    templateUrl: "pages/settings/settings.html",
    styleUrls: ["pages/settings/settings-common.css", "pages/settings/settings.css"],
})

export class SettingsComponent implements OnInit {
    public ver:string;
    public islocationEnabled:boolean = false; /* sample */

    constructor(private router: RouterExtensions,
                private zone: NgZone) {
        this.getPermission();

        let _this = this;

        applicationOn(resumeEvent, function(args: ApplicationEventData){
            if (args.android) {
                _this.getPermission();
            }
        });
    }

    private getPermission(){
        this.zone.run(() => {
            isEnabled().then(hasPermission => { this.islocationEnabled = hasPermission }).catch(() => { this.islocationEnabled = false });
        });
    }

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

        // @TODO: Fix behavior

        if (app.android) {
            let intent = new android.content.Intent(android.provider.Settings.ACTION_SETTINGS);
            intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK | android.content.Intent.FLAG_ACTIVITY_MULTIPLE_TASK);
            app.android.context.startActivity(intent);
        }
    }

    ngOnInit(){
        appversion.getVersionName().then(v => this.ver = v);
    }
}