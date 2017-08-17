import {Component, OnInit, AfterViewChecked, ViewChild, ElementRef} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {Store} from "@ngrx/store";
import {IAppState} from "../../../modules/ngrx/index";
import {IUser} from "../../../shared/user/user.model";
import {User} from "../../../shared/user/user.class";
import {Layout} from "tns-core-modules/ui/layouts/layout";
import {FloatLabelsUtil} from "../../../utils/float-labels-util";
import {LabelState} from "../../../shared/enums/floatLabel.enum";
import {TextField} from "tns-core-modules/ui/text-field";
import {UserService} from "../../../shared/user/user.service";
import {Config} from "../../../modules/core/config";
import {IAccount} from "../../../shared/account/account.model";
import {Account} from "../../../shared/account/account.class";

@Component({
    selector: "edit-requisites",
    templateUrl: "pages/withdrawal/edit-requisites/edit-requisites.html"
})

export class EditRequisitesComponent implements OnInit, AfterViewChecked {

    user: IUser;
    layout;
    FloatLabels;
    errors:IAccount;

    @ViewChild("container") container: ElementRef;
    @ViewChild("bic") bic: ElementRef;
    @ViewChild("bnk_corr") bnk_corr: ElementRef;
    @ViewChild("fio") fio: ElementRef;
    constructor(private router: RouterExtensions,
                private store: Store<IAppState>,
                private userService: UserService){
        this.user = new User();
        this.errors = new Account();

        this.store.select("user").subscribe(u => {
            if (u)
                if (u.account)
                    this.user.account = u.account;
        });
    }

    ngOnInit(){
        this.layout = <Layout>this.container.nativeElement;
    }

    goBack(){
        this.router.back();
    }

    clearErrors(){
        for (let key in this.errors) this.clearError(key);
    }
    clearError(key){
        if (this.errors[key] !== null) this.errors[key] = null;
    }

    async save(){

        this.clearErrors();

        if (!this.checkBik() || !this.checkBnkCorr() || !this.checkFio()){
            if (!this.checkBik()){
                this.FloatLabels.setFloatingLabels( <TextField>this.bic.nativeElement, LabelState.error);
            }

            if (!this.checkBnkCorr()){
                this.FloatLabels.setFloatingLabels( <TextField>this.bnk_corr.nativeElement, LabelState.error);
            }

            if (!this.checkFio()){
                this.FloatLabels.setFloatingLabels( <TextField>this.fio.nativeElement, LabelState.error);
            }

            return;
        }

        await this.userService.checkBik(this.user.account.bic).subscribe( () => {}, e => {
            this.FloatLabels.setFloatingLabels( <TextField>this.bic.nativeElement, LabelState.error);
            this.errors["bic"] = Config.messages.error.body["bic-not-found"];
        });


        /* send data on server for update if ok return ? o mb state here*/

        // this.router.navigate(['card-info']);


    }

    isNumeric(n:string){
        return !isNaN(parseFloat(n)) && isFinite(+n)
    }

     checkBik():boolean{

       if (this.user.account.bic.length !== Config.bicLength) {
           this.errors["bic"] = Config.messages.error.body["bic-length"];
           return false;
       }
       if (!this.isNumeric(this.user.account.bic)){
           this.errors["bic"] = Config.messages.error.body["bic-type"];
           return false;
       }
       return true;
    }

    checkBnkCorr():boolean{
        if (this.user.account.bnk_corr.length !== Config.bnkCorrLength) {
            this.errors["bnk_corr"] = Config.messages.error.body["bnk-corr-length"];
            return false;
        }
        if (!this.isNumeric(this.user.account.bnk_corr)){
            this.errors["bnk_corr"] = Config.messages.error.body["bnk-corr-type"];
            return false;
        }
        return true;
    }

    checkFio():boolean{
        if (!this.user.account.fio.trim()) {
            this.errors["fio"] = Config.messages.error.body["fio-length"];
            return false;
        }

        if (~(this.user.account.fio.search(/[0-9]/i))){
            this.errors["fio"] = Config.messages.error.body["fio-type"];
            return false;
        }

        return true;
    }

    onTap(args){
        this.FloatLabels.setFloatingLabels(<TextField>args.object, LabelState.focus);
    }

    ngAfterViewChecked(){
        this.FloatLabels = new FloatLabelsUtil(this.layout);
        this.FloatLabels.initTextFields();
    }

}