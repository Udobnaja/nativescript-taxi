import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import {Autopark} from "../autopark/autopark.class";
import {IUser} from "./user.model";
import {Config} from "../../modules/core/config";

@Injectable()
export class UserService {

    constructor(private http: Http){

    }
    // register({ signal, password }: User, {city, name}: Autopark) {
    //
    //     let payload = {
    //         signal: signal,
    //         password: password,
    //         city: city,
    //         name: name
    //     };
    //
    //     return this.http.post(
    //         "auth",
    //         payload
    //     ).map(response => { console.log('hhhh',response); return response.json()})
    //     .do(data => {
    //        // Config.token = data.Result.access_token;
    //     }).catch(this.handleErrors);
    // }



    getProfile(data){
        let {signal, password} = data.payload.user;
        let {city, name} = data.payload.autopark;

        let headers = new Headers();
        headers.append('X-Driver-Auth', `${signal}:${password}:${city}:${name}`);

        return this.http.get("driver/info", {headers: headers})
            .map(res => res.json().driver).do(data => {
                localStorage.setItem("token", data.uuid);
            }).catch(this.handleErrors)
    }

    getDate():string{
      return  null;
    }

    saveDate(date:string){
        // this.mock = {name: '', signal: '', balance: '', date: date}
        //
        // // this.user.date = date;
        // // this.mock.date = date;
        // // console.dir(this.mock);
        // // this.user.next(date);
    }


    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}