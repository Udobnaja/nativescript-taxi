import {Component, ChangeDetectionStrategy, OnInit,ViewChild, ElementRef} from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { SetupItemViewArgs } from "nativescript-angular/directives";
import { ListView } from "ui/list-view";
import {Autopark} from "../../../shared/autopark/autopark.class";
import {Color} from "tns-core-modules/color";

@Component({
    selector: "modal-content",
    templateUrl: "pages/login/dialog/choose-autopark.html",
    styleUrls: ["pages/login/dialog/choose-autopark-common.css", "pages/login/dialog/choose-autopark.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DialogContent implements OnInit{
    public autoparks: Array<Autopark>;
    @ViewChild("list") list: ElementRef;

    public selectedIndex:number = null;

    constructor(private params: ModalDialogParams) {
        this.autoparks = params.context.autoparkList;
        // this.listView = <ListView>this.list.nativeElement;
    }

    public close() {
        this.params.closeCallback(null);
    }

    public onItemTap(args) {
        // let listView = <ListView>args.object;
        // listView.android.setBackgroundResource(0);
        this.selectedIndex = args.index;
        // listView.refresh();
        this.params.closeCallback(args.index);
    }

    onSetupItemView(args: SetupItemViewArgs) {
        args.view.context.active = (args.index === this.params.context.index);
    }

    ngOnInit(){

    }

}