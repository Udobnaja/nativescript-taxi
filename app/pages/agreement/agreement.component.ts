import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone} from "@angular/core";
import {Router} from "@angular/router";
import { Page } from "ui/page";
import {Config} from "../../modules/core/config";
import {WebView, LoadEventData} from "tns-core-modules/ui/web-view";
import {AuthService} from "../../shared/services/auth/auth.service";
import * as dialogs from "ui/dialogs";

@Component({
    selector: "agreement-content",
    templateUrl: "pages/agreement/agreement.html",
    styleUrls: ["pages/agreement/agreement-common.css", "pages/agreement/agreement.css"],
    providers: [AuthService]
})

export class AgreementComponent implements OnInit, AfterViewInit{
    url: string = Config.PrivacyPolicyLink;
    isLoading: boolean = true;

    @ViewChild("webview") webview: ElementRef;

    constructor(private router: Router,
                private page: Page,
                private zone: NgZone,
                private authService: AuthService){}

    ngOnInit(){
        this.page.androidStatusBarBackground = Config.ActionBarColor;
    }

    close(){
        this.router.navigate(["login"]);
    }

    goNext(){
        this.authService.acceptUser().subscribe(() => {
            localStorage.setItem('agreement', "1");
            this.router.navigate(["card-info"]);
        }, () => dialogs.alert({
            title: Config.messages.error.title,
            message: Config.messages.error.body.restart,
            okButtonText: Config.messages.button.ok
        }))
    }

    ngAfterViewInit() {
        let webview: WebView = this.webview.nativeElement;

        webview.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
            this.zone.run(() => {
                this.isLoading = false;
            });

            if (args.error) {
                dialogs.alert({
                    title: Config.messages.error.title,
                    message: Config.messages.error.body.restart,
                    okButtonText: Config.messages.button.ok
                })
            }
        })
    }

}