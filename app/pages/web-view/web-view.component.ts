import {Component, AfterViewInit, ElementRef, ViewChild, NgZone} from "@angular/core";
import {RouterExtensions, PageRoute} from "nativescript-angular";
import {WebView, LoadEventData} from "tns-core-modules/ui/web-view";
import "rxjs/add/operator/switchMap";
import {Config} from "../../modules/core/config";
import * as dialogs from "ui/dialogs";

@Component({
    selector: "wV",
    templateUrl: "pages/web-view/web-view.html"
})

export class WebViewComponent implements AfterViewInit{
    url: string = "";
    title: string = "";
    isLoading: boolean = true;

    @ViewChild("webview") webview: ElementRef;

    constructor(private router: RouterExtensions,
                private route: PageRoute, private zone: NgZone){

        this.route.activatedRoute
            .switchMap(activatedRoute => activatedRoute.queryParams)
            .forEach(params => {
                this.url = params.link;
                this.title = params.title;
            });
    }

    goBack(){
        this.router.back();
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
                });
            }
        })
    }
}