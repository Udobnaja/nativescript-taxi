import {Component, OnInit} from "@angular/core";
import {DatePicker} from "tns-core-modules/ui/date-picker";
import {RouterExtensions, PageRoute} from "nativescript-angular";
import {UserService} from "../../shared/user/user.service";
import {Store} from "@ngrx/store";
import {IAppState} from "../../modules/ngrx/index";
import {NUser} from "../../modules/state-managment/actions/user.action";
import {IAccount} from "../../shared/account/account.model";
import {ConfigBackend} from "../../shared/config.service";

@Component({
    selector: "withdrawal",
    templateUrl: "pages/withdrawal/withdrawal.html",
    styleUrls: ["pages/withdrawal/withdrawal-common.css", "pages/withdrawal/withdrawal.css"],
    providers: [UserService]
})

export class WithdrawalComponent implements OnInit {
    isLoading:boolean;
    date: string;
    available: boolean;
    account: IAccount;

    constructor(private router: RouterExtensions,
                private userService: UserService,
                private store: Store<IAppState>,
                private config: ConfigBackend){
        this.isLoading = true;
        this.available = false;

        this.date = this.userService.getDate();

        this.store.select("user").subscribe(u => {
            if (u) this.account = u.account;
        });
    }

    goBack(){
        this.router.back();
    }

    onPickerLoaded(args){
        let datePicker = <DatePicker>args.object;

        let today = new Date();

        let currentDate = (!this.date) ? new Date() : new Date() /* replace hear on date from Date this.date */;

        datePicker.year = currentDate.getFullYear();
        datePicker.month = currentDate.getMonth();
        datePicker.day = currentDate.getDate();
        datePicker.minDate = today;

        let maxDate = today.setMonth(today.getMonth() + 3); /* + three month*/

        datePicker.maxDate = new Date(maxDate);

    }

    onDateChanged(args){
        this.isLoading = true;

        let timer = setTimeout(()=> {
            this.available = (!(new Date(args.value).getDate()%2));
            this.isLoading = false;
            clearTimeout(timer);
        }, 1000)

    }

    saveNewDate(){
        this.userService.saveDate('17 июня 20017');
    }

    ngOnInit(){
        this.store.dispatch(new NUser.LoadAccountAction());
    }
}