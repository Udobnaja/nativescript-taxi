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
    templateUrl: "./settings.html",
    styleUrls: ["./settings-common.css", "./settings.css"],
})

export class SettingsComponent implements OnInit {
    public ver: string;
    public islocationEnabled: boolean = false;

    constructor(private router: RouterExtensions,
                private zone: NgZone) {
        this.getPermission();

        let _this = this;

        applicationOn(resumeEvent, function(args: ApplicationEventData) {
            if (args.android) {
                _this.getPermission();
            }
        });
    }

    private getPermission() {
        isEnabled().then(hasPermission => {
            this.zone.run(() => { this.islocationEnabled = hasPermission; });
        }).catch(() => {
            this.zone.run(() => { this.islocationEnabled = false; });
        });
    }

    logout() {
        this.router.navigate(["login"], { clearHistory: true });
    }

    goBack(): void {
        this.router.back();
    }

    goToWebView(title: string, link: string): void {
        this.router.navigate(["webview"], {
            queryParams: {
                title: title,
                link:  link
            }
        });
    }

    goToPrivacyPolicy(args) {
        this.goToWebView(args.object.text, Config.privacyPolicyLink);
    }

    goToTermOfUse(args) {
        this.goToWebView(args.object.text, Config.termOfUseLInk);
    }

    private startAction(action) {
        let intent = new android.content.Intent(action);
        intent.addFlags(
            /* tslint:disable:no-bitwise */
            android.content.Intent.FLAG_ACTIVITY_NEW_TASK | android.content.Intent.FLAG_ACTIVITY_MULTIPLE_TASK
            /* tslint:enable:no-bitwise */
        );
        app.android.context.startActivity(intent);
    }

    toggleLocationPermissions() {

        if (app.android) {
            try {
                this.startAction(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS);
            } catch (e) {
                this.startAction(android.provider.Settings.ACTION_SETTINGS);
            }
        }
    }

    ngOnInit() {
        appversion.getVersionName().then(v => this.ver = v);
    }
}
