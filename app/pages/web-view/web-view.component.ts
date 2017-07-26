import {Component, AfterViewInit, ElementRef, ViewChild} from "@angular/core";
import {RouterExtensions, PageRoute} from "nativescript-angular";
import {WebView, LoadEventData} from "tns-core-modules/ui/web-view";
import "rxjs/add/operator/switchMap";

@Component({
    selector: "wV",
    templateUrl: "pages/web-view/web-view.html"
})

export class WebViewComponent implements AfterViewInit{
    url: string = "http://google.com";
    title: string = "";
    isLoading: boolean = true;

    @ViewChild("webview") webview: ElementRef;

    constructor(private router: RouterExtensions,
                private route: PageRoute){
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

        webview.on(WebView.loadFinishedEvent, function (args: LoadEventData) {
            this.isLoading = false;

            if (args.error) {
                alert("Попробуйте перезагрузить приложение...");
            }
        })
    }
}