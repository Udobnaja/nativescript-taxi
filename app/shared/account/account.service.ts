import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


@Injectable()
export class AccountService {
    constructor(private http: Http){

    }

    getAccount(){
        return this.http.get("driver/account")
            .map(res => res.json().account).catch(this.handleErrors)
    }

    handleErrors(error: Response) {
        return Observable.throw(error);
    }
}