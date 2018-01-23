import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ScheduleService{

    constructor(private http: HttpClient) {}

    getSchedule() {
        return this.http.get("driver/schedule")
    }

    getPaymentSchedules() {
        return this.http.get("payment_schedules");
    }
}
