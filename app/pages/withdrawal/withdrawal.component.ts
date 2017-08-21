import {Component, OnInit} from "@angular/core";
import {DatePicker} from "tns-core-modules/ui/date-picker";
import {RouterExtensions} from "nativescript-angular";
import {UserService} from "../../shared/services/user/user.service";
import {Store} from "@ngrx/store";
import {IAppState} from "../../modules/ngrx/index";
import {NUser} from "../../modules/state-managment/actions/user.action";
import {IAccount} from "../../shared/models/account/account.model";
import {ConfigBackend} from "../../modules/core/services/config.service";
import {ScheduleService} from "../../shared/services/schedule/schedule.service";
import {Config} from "../../modules/core/config";
import * as dialogs from "ui/dialogs";

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
    reason: string = "";
    currentDate: Date;

    constructor(private router: RouterExtensions,
                private userService: UserService,
                private store: Store<IAppState>,
                private config: ConfigBackend,
                private scheduleService: ScheduleService){
        this.isLoading = true;
        this.available = false;

        this.date = this.userService.getDate();
        this.reason = Config.messages.schedule.default;

        this.store.select("user").subscribe(u => {
            if (u) this.account = u.account;
        });
    }

    private checkDates(val){
        let date = new Date(val).getDate();
        let day = new Date(val).getDay();

        this.reason = Config.messages.schedule[this.schedule] || Config.messages.schedule.default;

        switch (this.scheduleEnum[this.schedule]){
            case this.scheduleEnum["1-5"]:
                this.available = (date >= 1 || date <= 5);
                break;
            case this.scheduleEnum["1-5_15-20"]:
                this.available = (date >= 1 || date <= 5 || date >=15 || date <= 20);
                break;
            case this.scheduleEnum["daily"]:
            case this.scheduleEnum["immediately"]:
                this.available = true;
                break;
            case this.scheduleEnum["every_fri"]:
                this.available = (day === 5);
                break;
            case this.scheduleEnum["every_mon_every_thu"]:
                this.available = (day === 1 || day === 4);
                break;
            case this.scheduleEnum["every_thu"]:
                this.available = (day === 4);
                break;
            case this.scheduleEnum["weekly"]:
                this.available = (day === 1);
                break;
            case this.scheduleEnum["no_payment"]:
            default:
                this.available = false;
                break;
        }
    }

    goBack(){
        this.router.back();
    }

    edit(){
        this.router.navigate(['edit-requisites']);
    }

    onPickerLoaded(args){
        let datePicker = <DatePicker>args.object;

        let today = new Date();

        this.currentDate = (!this.date) ? new Date() : new Date() /* replace hear on date from Date this.date */;

        datePicker.year = this.currentDate.getFullYear();
        datePicker.month = this.currentDate.getMonth();
        datePicker.day = this.currentDate.getDate();
        datePicker.minDate = today;

        let maxDate = today.setMonth(today.getMonth() + Config.maxNextMonth);

        datePicker.maxDate = new Date(maxDate);
    }

    onDateChanged(args){
        this.checkDates(args.value);
    }

    saveNewDate(){
        this.router.navigate(["card-info"]);
        // post date to Server
        // this.userService.saveDate('17 июня 20017');
    }

    ngOnInit(){
        this.store.dispatch(new NUser.LoadAccountAction());
        this.scheduleEnum = this.config.getSchedule();
        this.scheduleService.getSchedule().subscribe(s => {
            this.schedule = s;
            this.checkDates(this.currentDate);
            this.isLoading = false;
        }, () =>
            dialogs.alert({
                title: Config.messages.error.title,
                message: Config.messages.error.body.restart,
                okButtonText: Config.messages.button.ok
            })
        );

    }
}