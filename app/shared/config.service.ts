import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {ScheduleService} from "./schedule/schedule.service";

@Injectable()
export class ConfigBackend {
    private result: Object = null;

    constructor(private http: Http, private scheduleService: ScheduleService) {

    }

    public getSchedule() {

       let schedule:any = this.result;
        let pseudoEnum;
        (function (pseudoEnum) {
            schedule.forEach(res => {
                pseudoEnum[pseudoEnum[res.name] = res.value] = res.name;
            });
        })(pseudoEnum || (pseudoEnum = {}));
        return pseudoEnum;
    }


    public getResult() {
        return this.result;
    }

    public load() {
        return new Promise(
            (resolve, reject) => {
                this.scheduleService.getPaymentSchedules().subscribe( callResult => {
                    this.result = callResult;
                    resolve(true);
                });
            });
    }
}