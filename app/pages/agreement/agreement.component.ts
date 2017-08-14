import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone} from "@angular/core";
import {Router} from "@angular/router";
import { Page } from "ui/page";
import {Config} from "../../modules/core/config";
import {WebView, LoadEventData} from "tns-core-modules/ui/web-view";

@Component({
    selector: "agreement-content",
    templateUrl: "pages/agreement/agreement.html",
    styleUrls: ["pages/agreement/agreement-common.css", "pages/agreement/agreement.css"],
})

export class AgreementComponent implements OnInit, AfterViewInit{
    url: string = Config.PrivacyPolicyLink;
    isLoading: boolean = true;

    @ViewChild("webview") webview: ElementRef;

    constructor(private router: Router,
                private page: Page,
                private zone: NgZone){}

    ngOnInit(){
        this.page.androidStatusBarBackground = Config.ActionBarColor;
        /* In this place get confidential */
        // this.content = "<h1>Политика Конфиденциальности</h1><span color='#000'>Test</span>";

    }

    close(){
        this.router.navigate(["login"]);
    }

    goNext(){
        /* in this place post accept to server for this user */
        this.router.navigate(["card-info"]);
    }

    ngAfterViewInit() {
        let webview: WebView = this.webview.nativeElement;

        webview.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
            this.zone.run(() => {
                this.isLoading = false;
            });

            if (args.error) {
                alert("Попробуйте перезагрузить приложение...");
            }
        })
    }

}