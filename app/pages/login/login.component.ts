import { Component,  ElementRef, OnInit, OnDestroy, ViewChild, ViewContainerRef, AfterViewChecked} from "@angular/core";
import { User } from "../../shared/user/user.class";
import { Router } from "@angular/router";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";

const textFieldModule = require("ui/text-field");

import { Page } from "ui/page";
import {Label} from "ui/label";
import { TextField } from "ui/text-field";

import {Autopark} from "../../shared/autopark/autopark.class";
import {AutoparkListService} from "../../shared/autopark/autopark-list.service";
import {DialogContent} from "./dialog/choose-autopark.component";
import {AnimationCurve} from "ui/enums";
import {Layout} from "tns-core-modules/ui/layouts/layout";
import {Config} from "../../modules/core/config";
import {LabelState} from "../../shared/enums/floatLabel.enum";
import {IUser} from "../../shared/user/user.model";
import {IAutopark} from "../../shared/autopark/autopark.model";
import {AuthService} from "../../shared/auth.service";
import * as dialogs from "ui/dialogs";
import {FloatLabelsUtil} from "../../utils/float-labels-util";


@Component({
    selector: "my-app",
    providers: [AuthService, AutoparkListService],
    templateUrl: "pages/login/login.html",
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewChecked{
    user: IUser;
    autopark: IAutopark = null;

    @ViewChild("container") container: ElementRef;
    @ViewChild("signal") signal: ElementRef;
    @ViewChild("password") password: ElementRef;

    public autoparkList: Array<Autopark>;
    public result: string;
    public isLoading: boolean = true;

    layout;
    FloatLabels;

    constructor(private router: Router,
                private authService: AuthService,
                private autoparkListService: AutoparkListService,
                private page: Page,
                private modalService: ModalDialogService,
                private viewContainerRef: ViewContainerRef){

        localStorage.removeItem("token");

        this.user = new User();
        this.page.actionBarHidden = true;
        //HardCode
        this.user.signal = "99999";
        this.user.password = "999999";
    }

    submit() {
        if (!this.user.signal.trim()) {
            this.FloatLabels.setFloatingLabels( <TextField>this.signal.nativeElement, LabelState.error);
            return;
        }

        if (!this.user.password.trim()) {
            this.FloatLabels.setFloatingLabels( <TextField>this.password.nativeElement, LabelState.error);
            return;
        }

        this.signUp();
    }

    onTap(args){
        this.FloatLabels.setFloatingLabels(<TextField>args.object, LabelState.focus);
    }

    signUp(){
        let data = {user: this.user, autopark: this.autopark};

        this.authService.auth(data)
            .subscribe(
                res => {
                    if (res.json().driver.info.mob_license_accepted){
                        localStorage.setItem('agreement', res.json().driver.info.mob_license_accepted);
                        this.router.navigate(["card-info"])
                    } else {
                        this.router.navigate(["agreement"])
                    }

                },
                e => dialogs.alert({title: Config.messages.error.title, message: e.message, okButtonText: Config.messages.button.ok})
            );
    }

    public show() {
        /*
            mb remember current index ?
        */

        let options: ModalDialogOptions = {
            context: {
                autoparkList: this.autoparkList,
                index: (this.autopark) ? this.autoparkList.findIndex(
                    item => (this.autopark.city === item.city && this.autopark.name === item.name)
                ): null},
            fullscreen: false,
            viewContainerRef: this.viewContainerRef
        };

        this.modalService.showModal(DialogContent, options).then((index: string) => {
            if (index) this.autopark = this.autoparkList[index];
        });
    }

    ngOnInit() {
        this.page.androidStatusBarBackground = Config.DefaultActionBarColor;

        this.layout = <Layout>this.container.nativeElement;

        this.autoparkListService.load().subscribe(loadedAutoparks => {
                this.autoparkList = loadedAutoparks;
                this.isLoading = false;
            }, () => dialogs.alert({
                title: Config.messages.error.title,
                message: Config.messages.error.body.restart,
                okButtonText: Config.messages.button.ok
            })
        );
    }

    ngOnDestroy(){
        <TextField>this.password.nativeElement.off(textFieldModule.TextField.blurEvent);
        <TextField>this.signal.nativeElement.off(textFieldModule.TextField.blurEvent);
    }

    ngAfterViewChecked(){
        this.FloatLabels = new FloatLabelsUtil(this.layout);
        this.FloatLabels.initTextFields();
    }
}