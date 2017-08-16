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

@Component({
    selector: "edit-requisites",
    templateUrl: "pages/withdrawal/edit-requisites/edit-requisites.html"
})

export class EditRequisitesComponent implements OnInit, AfterViewChecked {

    user: IUser;
    layout;
    FloatLabels;

    @ViewChild("container") container: ElementRef;
    constructor(private router: RouterExtensions,
                private store: Store<IAppState>,
                private userService: UserService){
        this.user = new User();

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

    save(){
        // this.user.account.bik

        this.checkBik();
        // if (!this.checkBik()) alert("Номера такого Бик не существует");

        // this.router.navigate(['card-info']);
    }

    checkBik(){
        this.userService.checkBik(this.user.account.bic).subscribe(e => {
            console.log('ok');
            console.dir(e);
        }, e => {
            console.dir(e);
        });
    }

    onTap(args){
        this.FloatLabels.setFloatingLabels(<TextField>args.object, LabelState.focus);
    }

    ngAfterViewChecked(){
        this.FloatLabels = new FloatLabelsUtil(this.layout);
        this.FloatLabels.initTextFields();
    }

}