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
        isEnabled().then(hasPermission => {
            this.zone.run(() => { this.islocationEnabled = hasPermission })
        }).catch(() => {
            this.zone.run(() => { this.islocationEnabled = false })
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

    private startAction(action){
        let intent = new android.content.Intent(action);
        intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK | android.content.Intent.FLAG_ACTIVITY_MULTIPLE_TASK);
        app.android.context.startActivity(intent);
    }

    toggleLocationPermissions(){

        if (app.android) {
            try {
                this.startAction(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS);
            } catch(e){
                this.startAction(android.provider.Settings.ACTION_SETTINGS);
            }
        }
    }

    ngOnInit(){
        appversion.getVersionName().then(v => this.ver = v);
    }
}