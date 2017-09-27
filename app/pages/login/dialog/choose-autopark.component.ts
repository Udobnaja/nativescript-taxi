import {Component, ChangeDetectionStrategy, OnInit,ViewChild, ElementRef} from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { SetupItemViewArgs } from "nativescript-angular/directives";
import {Autopark} from "../../../shared/models/autopark/autopark.class";

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

        this.autoparks.sort((a, b) => {
           let cityA = a.title.toLowerCase();
           let cityB = b.title.toLowerCase();

           return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;
        });
    }

    public close() {
        this.params.closeCallback(null);
    }

    public onItemTap(args) {
        this.selectedIndex = args.index;
        this.params.closeCallback(args.index);
    }

    onSetupItemView(args: SetupItemViewArgs) {
        args.view.context.active = (args.index === this.params.context.index);
    }

    ngOnInit(){

    }

}