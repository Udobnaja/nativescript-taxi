import { Component,  ElementRef, OnInit, OnDestroy, ViewChild, ViewContainerRef, AfterViewChecked} from "@angular/core";
import { Router } from "@angular/router";

import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";

const textFieldModule = require("ui/text-field");
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { Layout } from "ui/layouts/layout";
import * as dialogs from "ui/dialogs";

import 'rxjs/add/operator/finally';

import { Config } from "../../modules/core/config";
import { User } from "../../shared/models/user/user.class";
import { Autopark } from "../../shared/models/autopark/autopark.class";
import { DialogContent } from "./dialog/choose-autopark.component";
import { IUser } from "../../shared/models/user/user.model";
import { IAutopark } from "../../shared/models/autopark/autopark.model";
import { AutoparkListService } from "../../shared/services/autopark/autopark-list.service";
import { AuthService } from "../../shared/services/auth/auth.service";
import { LabelState } from "../../shared/enums/floatLabel.enum";
import { FloatLabelsUtil } from "../../utils/float-labels-util";


@Component({
    selector: "my-app",
    providers: [AuthService, AutoparkListService],
    templateUrl: "./login.html",
    styleUrls: ["./login-common.css"]
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewChecked {
    user: IUser;
    autopark: IAutopark = null;

    @ViewChild("container") container: ElementRef;
    @ViewChild("signal") signal: ElementRef;
    @ViewChild("password") password: ElementRef;

    public autoparkList: Array<Autopark>;
    public result: string;
    public isLoading: boolean = true;

    layout;
    /* tslint:disable:variable-name */
    FloatLabels;
    /* tslint:enable:variable-name */
    constructor(private router: Router,
                private authService: AuthService,
                private autoparkListService: AutoparkListService,
                private page: Page,
                private modalService: ModalDialogService,
                private viewContainerRef: ViewContainerRef) {

        localStorage.removeItem("token");

        this.user = new User();
        this.page.actionBarHidden = true;
        // HardCode
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

    onTap(args) {
        this.FloatLabels.setFloatingLabels(<TextField>args.object, LabelState.focus);
    }

    signUp() {
        let data = { user: this.user, autopark: this.autopark };

        this.authService.auth(data)
            .subscribe(
                res => {
                    if (res['driver'].info.mob_license_accepted) {
                        localStorage.setItem("agreement", res['driver'].info.mob_license_accepted);
                        this.router.navigate(["card"]);
                    } else {
                        this.router.navigate(["agreement"]);
                    }
                },
                e => dialogs.alert({
                    title: Config.messages.error.title,
                    message: e.message,
                    okButtonText: Config.messages.button.ok
                })
            );
    }

    public show() {

        let options: ModalDialogOptions = {
            context: {
                autoparkList: this.autoparkList,
                index: (this.autopark) ? this.autoparkList.findIndex(
                    item => (this.autopark.city === item.city && this.autopark.name === item.name)
                ) : null },
            fullscreen: false,
            viewContainerRef: this.viewContainerRef
        };

        this.modalService.showModal(DialogContent, options).then((index: number) => {
            if (index >= 0) { this.autopark = this.autoparkList[index]; }
        });
    }

    ngOnInit() {
        this.page.androidStatusBarBackground = Config.defaultActionBarColor;

        this.layout = <Layout>this.container.nativeElement;

        this.autoparkListService
            .load()
            .finally(() => this.isLoading = false)
            .subscribe(data => {
                this.autoparkList = data["autoparks"]
                    .map(autopark => new Autopark(autopark.city, autopark.name, autopark.title))
                    .sort((a, b) => {
                        let cityA = a.title.toLowerCase();
                        let cityB = b.title.toLowerCase();

                        return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;
                });
            }, (e) => dialogs.alert({
                title: Config.messages.error.title,
                message: Config.messages.error.body.restart,
                okButtonText: Config.messages.button.ok
            }));
    }

    ngOnDestroy() {
        <TextField>this.password.nativeElement.off(textFieldModule.TextField.blurEvent);
        <TextField>this.signal.nativeElement.off(textFieldModule.TextField.blurEvent);
    }

    ngAfterViewChecked() {
        this.FloatLabels = new FloatLabelsUtil(this.layout);
        this.FloatLabels.initTextFields();
    }
}
