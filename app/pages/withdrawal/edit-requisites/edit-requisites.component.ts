import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import {Store} from "@ngrx/store";
import {IAppState} from "../../../modules/ngrx/index";
import {IUser} from "../../../shared/user/user.model";
import {User} from "../../../shared/user/user.class";

@Component({
    selector: "edit-requisites",
    templateUrl: "pages/withdrawal/edit-requisites/edit-requisites.html"
})

export class EditRequisitesComponent implements OnInit {

    user: IUser;
    constructor(private router: RouterExtensions,  private store: Store<IAppState>){
        this.user = new User();

        this.store.select("user").subscribe(u => {
            if (u) this.user.account = u.account;
        });
    }

    ngOnInit(){

    }

    goBack(){
        this.router.back();
    }

    save(){
        this.router.navigate(['card-info']);
    }

}