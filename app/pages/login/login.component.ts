import { Component,  ElementRef, OnInit, OnDestroy, ViewChild, ViewContainerRef, AfterViewChecked} from "@angular/core";
import { User } from "../../shared/user/user.class";
import { UserService } from "../../shared/user/user.service";
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

import { Store } from '@ngrx/store';
import {IAppState} from "../../modules/ngrx/index";
import {NUser} from "../../modules/state-managment/actions/user.action";



@Component({
    selector: "my-app",
    providers: [UserService, AutoparkListService],
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

    constructor(private router: Router,
                private userService: UserService,
                private autoparkListService: AutoparkListService,
                private page: Page,
                private modalService: ModalDialogService,
                private viewContainerRef: ViewContainerRef,
                private store: Store<IAppState>){

        this.user = new User();
        //HardCode
        this.user.signal = "01002";
        this.user.password = "1830221";
    }

    private setLabel(textField:TextField):Label{
        return this.layout.getChildAt(this.layout.getChildIndex(textField) - 1);
    }

    private animateLabel(label:Label, state:LabelState){
        label.animate({
            translate: { x: 0, y: Config.getLabelsSettings(state).translateY},
            duration: 200,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        });
    }

    private initFloatingLabels(textField:TextField){
        let label = this.setLabel(textField);
        let state = (!textField.text.length) ? LabelState.blur : LabelState.focus;

        label.fontSize = Config.getLabelsSettings(state).fontSize;

        this.animateLabel(label, state);
    }

    private setFloatingLabels(textField:TextField, state:LabelState){
        let label = this.setLabel(textField);

        textField.borderBottomColor = Config.getLabelsSettings(state).color;

        if (state === LabelState.error){
            textField.text = '';
            label.color = Config.getLabelsSettings(state).color;
        } else {
            label.color = Config.getLabelsSettings(LabelState.default).color;
        }

        if(!textField.text.length){
            label.fontSize = Config.getLabelsSettings(state).fontSize;
            this.animateLabel(label, state);
        }
    }


    submit() {
        if (!this.user.signal.trim()) {
            this.setFloatingLabels( <TextField>this.signal.nativeElement, LabelState.error);
            return;
        }

        if (!this.user.password.trim()) {
            this.setFloatingLabels( <TextField>this.password.nativeElement, LabelState.error);
            return;
        }

        this.signUp();
    }

    onTap(args){
        this.setFloatingLabels(<TextField>args.object, LabelState.focus);
    }

    signUp(){
        this.store.dispatch(new NUser.LoadAction({user: this.user, autopark: this.autopark}));
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

    ngOnInit(){
        this.page.actionBarHidden = true;
        this.page.androidStatusBarBackground = Config.DefaultActionBarColor;

        this.layout = <Layout>this.container.nativeElement;

        this.autoparkListService.load().subscribe(loadedAutoparks => {
            this.autoparkList = loadedAutoparks;
            this.isLoading = false;
        }, () => alert("Попробуйте перезапустить приложение."))
    }

    ngOnDestroy(){
        <TextField>this.password.nativeElement.off(textFieldModule.TextField.blurEvent);
        <TextField>this.signal.nativeElement.off(textFieldModule.TextField.blurEvent);
    }

    ngAfterViewChecked(){
        let cLength = this.layout.getChildrenCount();

        for(let i = 0; i < cLength; i++){
            let child = this.layout.getChildAt(i);
            if (child instanceof TextField){
                this.initFloatingLabels(child);
                child.on(textFieldModule.TextField.blurEvent, () => {
                    this.setFloatingLabels(child, LabelState.blur);
                });
            }
        }

    }
}