import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class ScheduleService {

    constructor(private http: Http){

    }

    getSchedule(){
        return this.http.get("driver/schedule")
            .map(res => res.json().schedule).catch(this.handleErrors)
    }

    getPaymentSchedules(){
        return this.http.get("payment_schedules").map(res => res.json().payment_schedules).catch(this.handleErrors);
    }


    private handleErrors(error: Response) {
        return Observable.throw(error);
    }


}