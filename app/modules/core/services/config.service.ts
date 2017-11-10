import { Injectable } from "@angular/core";
import { ScheduleService } from "../../../shared/services/schedule/schedule.service";

@Injectable()
export class ConfigBackend {
    private result: Object = null;

    constructor(private scheduleService: ScheduleService) {

    }
    /* tslint:disable:no-shadowed-variable */
    public getSchedule() {

       let schedule: any = this.result;
        let pseudoEnum;
        (function (pseudoEnum) {
            schedule.forEach(res => {
                pseudoEnum[pseudoEnum[res.name] = res.value] = res.name;
            });
        })(pseudoEnum || (pseudoEnum = {}));
        return pseudoEnum;
    }
    /* tslint:enable:no-shadowed-variable */


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
