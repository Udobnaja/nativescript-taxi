/*@TODO: create one template and component for privacy-police and term of use*/

import {Component, ViewChild, ElementRef} from "@angular/core";
import {Config} from "../../shared/config";
import {RouterExtensions} from "nativescript-angular";
import {WebView, LoadEventData} from "tns-core-modules/ui/web-view";

@Component({
    selector: "TermOfUse",
    templateUrl: "pages/term-of-use/term-of-use.html",
})

export class TermOfUseComponent{
    url: string = Config.TermOfUseLInk;

    isLoading: boolean = true;

    @ViewChild("webview") webview: ElementRef;

    constructor(private router: RouterExtensions){}

    goBack(){
        this.router.back();
    }

    ngAfterViewInit() {
        let webview: WebView = this.webview.nativeElement;

        webview.on(WebView.loadFinishedEvent, function (args: LoadEventData) {
            this.isLoading = false;

            if (args.error) {
                alert("Попробуйте перезагрузить приложение...");
            }
        })
    }
}