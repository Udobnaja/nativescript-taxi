import {Component, OnInit} from "@angular/core";
import {DatePicker} from "tns-core-modules/ui/date-picker";
import {RouterExtensions, PageRoute} from "nativescript-angular";
import {User} from "../../shared/user/user.class";
import {UserService} from "../../shared/user/user.service";

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

    constructor(private router: RouterExtensions,
        private userService: UserService){
        this.isLoading = true;
        this.available = false;

        this.date = this.userService.getDate();
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

    }
}