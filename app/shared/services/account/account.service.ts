import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {IAccount} from "../../models/account/account.model"
import { ErrorService } from "../error/error.service";

@Injectable()
export class AccountService extends ErrorService{
    constructor(private http: Http){
        super();
    }

    getAccount(){
        return this.http.get("driver/account")
            .map(res => res.json().account).catch(this.handleErrors)
    }

    updateAccount(account:IAccount){
        return this.http.post("driver/account", account).map(res => account).catch(this.handleErrors);
    }
}