import {Component, ChangeDetectionStrategy, OnInit} from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
    selector: "modal-confirm",
    templateUrl: "pages/card-info/dialog/confirm.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConfrimContent implements OnInit{

    constructor(private params: ModalDialogParams){}

    ngOnInit(){

    }

}