import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {Store} from "@ngrx/store";
import {IAppState} from "../../../modules/ngrx/index";
import {IUser} from "../../../shared/user/user.model";

@Component({
    selector: "edit-requisites",
    templateUrl: "pages/withdrawal/edit-requisites/edit-requisites.html"
})

export class EditRequisitesComponent implements OnInit {

    user: IUser;
    constructor(private router: RouterExtensions,  private store: Store<IAppState>){
        this.store.select("user").subscribe(u => {
            // if (u) this.account = u.account;
        });
    }

    ngOnInit(){

    }

    goBack(){
        this.router.back();
    }

}