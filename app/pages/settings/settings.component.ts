import {Component, OnInit} from "@angular/core";

import {Config} from "../../modules/core/config";
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

    constructor(private router: RouterExtensions){}

    logout(){
        localStorage.removeItem("token");
        this.router.navigate(["/login"], { clearHistory: true });
    }

    goBack():void{
        this.router.back();
    }

    goToWebView(title: string, link:string):void{
        this.router.navigate(["/webview"], {
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

    toggleMessagePermissions(){ /* mb create observable on isMessageEnabled*/
        Config.messagePermissons = !this.isMessageEnabled;
    }

    ngOnInit(){
        appversion.getVersionName().then(v => this.ver = v);
    }
}