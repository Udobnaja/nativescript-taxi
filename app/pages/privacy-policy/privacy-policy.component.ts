import {Component, AfterViewInit, ElementRef, ViewChild} from "@angular/core";
import {Config} from "../../shared/config";
import {RouterExtensions} from "nativescript-angular";
import {WebView, LoadEventData} from "tns-core-modules/ui/web-view";

@Component({
    selector: "privacyPolicy",
    templateUrl: "pages/privacy-policy/privacy-policy.html"
})

export class PrivacyPolicyComponent implements AfterViewInit{
    url: string = Config.PrivacyPolicyLink;
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