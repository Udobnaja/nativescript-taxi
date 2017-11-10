import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { ErrorService } from "../error/error.service";

@Injectable()
export class ScheduleService extends ErrorService {

    constructor(private http: Http) {
        super();
    }

    getSchedule() {
        return this.http.get("driver/schedule")
            .map(res => res.json().schedule).catch(this.handleErrors);
    }

    getPaymentSchedules() {
        return this.http.get("payment_schedules").map(res => res.json().payment_schedules).catch(this.handleErrors);
    }
}
