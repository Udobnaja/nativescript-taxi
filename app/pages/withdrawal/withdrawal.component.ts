import {Component, OnInit} from "@angular/core";
import {DatePicker} from "tns-core-modules/ui/date-picker";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "withdrawal",
    templateUrl: "pages/withdrawal/withdrawal.html",
    styleUrls: ["pages/withdrawal/withdrawal-common.css", "pages/withdrawal/withdrawal.css"],
})

export class WithdrawalComponent implements OnInit {
    constructor(private router: RouterExtensions){
    }

    goBack(){
        this.router.back();
    }

    onPickerLoaded(args){
        let datePicker = <DatePicker>args.object;
        let today = new Date();

        datePicker.year = today.getFullYear();
        datePicker.month = today.getMonth();
        datePicker.day = today.getDay();
        datePicker.minDate = today;

        let maxDate = today.setMonth(today.getMonth() + 3); /* + three month*/

        datePicker.maxDate = new Date(maxDate);
    }

    ngOnInit(){

    }
}