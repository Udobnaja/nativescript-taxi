import { Component, ChangeDetectionStrategy, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { SetupItemViewArgs } from "nativescript-angular/directives";
import { Autopark } from "../../../shared/models/autopark/autopark.class";

@Component({
    selector: "modal-content",
    templateUrl: "./choose-autopark.html",
    styleUrls: ["./choose-autopark-common.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DialogContent implements OnInit {
    public autoparks: Array<Autopark>;
    @ViewChild("list") list: ElementRef;

    public selectedIndex: number = null;

    constructor(private params: ModalDialogParams) {
        this.autoparks = params.context.autoparkList;
    }

    public close() {
        this.params.closeCallback(null);
    }

    public onItemTap(args) {
        this.selectedIndex = args.index;
        this.params.closeCallback(+this.selectedIndex);
    }

    onSetupItemView(args: SetupItemViewArgs) {
        args.view.context.active = (args.index === this.params.context.index);
    }

    ngOnInit() {

    }
}
