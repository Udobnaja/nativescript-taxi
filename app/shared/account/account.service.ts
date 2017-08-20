import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {IAccount} from "./account.model"

@Injectable()
export class AccountService {
    constructor(private http: Http){

    }

    getAccount(){
        return this.http.get("driver/account")
            .map(res => res.json().account).catch(this.handleErrors)
    }


    updateAccount(account:IAccount){
        return this.http.post("driver/account", account).map(res => account).catch(this.handleErrors);
    }

    private handleErrors(error: Response) {
        return Observable.throw(error);
    }
}