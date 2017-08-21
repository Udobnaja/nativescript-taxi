import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import {Config} from "../../../modules/core/config";


@Injectable()
export class AuthService {

    constructor(private http: Http){

    }

    auth(data){
        let {signal, password} = data.user;
        let {city, name} = data.autopark;
        localStorage.setItem('token', `${signal}:${password}:${city}:${name}`);
        return this.http.get("driver/info").map(res => res).catch(this.handleErrors);
    }

    acceptUser(){
       return this.http.post("license_accepted", '').map(res => res).catch(this.handleErrors);
    }

    private handleErrors(error: Response) {
        let message =  (error.status === 404) ? Config.messages.error.body["user-not-found"] : Config.messages.error.body.restart;
        localStorage.removeItem('token');
        return Observable.throw(new Error(message));
    }
}