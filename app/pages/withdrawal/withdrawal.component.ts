import {Component, OnInit} from "@angular/core";
import {DatePicker} from "tns-core-modules/ui/date-picker";
import {RouterExtensions} from "nativescript-angular";
import {UserService} from "../../shared/user/user.service";
import {Store} from "@ngrx/store";
import {IAppState} from "../../modules/ngrx/index";
import {NUser} from "../../modules/state-managment/actions/user.action";
import {IAccount} from "../../shared/account/account.model";
import {ConfigBackend} from "../../shared/config.service";
import {ScheduleService} from "../../shared/schedule/schedule.service";

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
    scheduleEnum = {};
    schedule: string = "";
    reason: string = "Вывод денег недоступен в выбранный день, попробуйте изменить дату.";
    currentDate: Date;

    constructor(private router: RouterExtensions,
                private userService: UserService,
                private store: Store<IAppState>,
                private config: ConfigBackend,
                private scheduleService: ScheduleService){
        this.isLoading = true;
        this.available = false;

        this.date = this.userService.getDate();

        this.store.select("user").subscribe(u => {
            if (u) this.account = u.account;
        });
    }

    private checkDates(val){
        let date = new Date(val).getDate();
        let day = new Date(val).getDay();

        switch (this.scheduleEnum[this.schedule]){
            case this.scheduleEnum["1-5"]:
                this.available = (date >= 1 || date <= 5);
                this.reason = "Вывод денег осуществляется с 1 по 5 число месяца, попробуйте изменить дату.";
                break;
            case this.scheduleEnum["1-5_15-20"]:
                this.available = (date >= 1 || date <= 5 || date >=15 || date <= 20);
                this.reason = "Вывод денег осуществляется с 1 по 5 и с 15 по 20 число месяца, попробуйте изменить дату.";
                break;
            case this.scheduleEnum["daily"]:
                this.available = true;
                break;
            case this.scheduleEnum["every_fri"]:
                this.available = (day === 5);
                this.reason = "Вывод денег осуществляется каждую пятницу месяца, попробуйте изменить дату.";
                break;
            case this.scheduleEnum["every_mon_every_thu"]:
                this.available = (day === 1 || day === 4);
                this.reason = "Вывод денег осуществляется каждый понедельник и четверг месяца, попробуйте изменить дату.";
                break;
            case this.scheduleEnum["every_thu"]:
                this.available = (day === 4);
                this.reason = "Вывод денег осуществляется каждый четверг месяца, попробуйте изменить дату.";
                break;
            case this.scheduleEnum["immediately"]:
                this.available = true;
                break;
            case this.scheduleEnum["no_payment"]:
                this.available = false;
                this.reason = "В данный момент мы не осуществляем вывод денег.";
                break;
            case this.scheduleEnum["weekly"]:
                this.available = (day === 0);
                break;
            default:
                this.available = false;
                break;
        }
    }

    goBack(){
        this.router.back();
    }

    onPickerLoaded(args){
       /* this.isLoading = true;*/

        let datePicker = <DatePicker>args.object;

        let today = new Date();

        this.currentDate = (!this.date) ? new Date() : new Date() /* replace hear on date from Date this.date */;

        datePicker.year = this.currentDate.getFullYear();
        datePicker.month = this.currentDate.getMonth();
        datePicker.day = this.currentDate.getDate();
        datePicker.minDate = today;

        let maxDate = today.setMonth(today.getMonth() + 3); /* + three month*/

        datePicker.maxDate = new Date(maxDate);
    }

    onDateChanged(args){
        this.checkDates(args.value);
    }

    saveNewDate(){
        this.userService.saveDate('17 июня 20017');
    }

    ngOnInit(){
        this.store.dispatch(new NUser.LoadAccountAction());
        this.scheduleEnum = this.config.getSchedule();
        this.scheduleService.getSchedule().subscribe(s => {
            this.schedule = s;
            this.checkDates(this.currentDate);
            this.isLoading = false;
        }, () => {
            console.log('error');
        });

    }
}