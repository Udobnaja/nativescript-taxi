import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "./user.class";
import {Autopark} from "../autopark/autopark.class";
import {Config} from "../config";

@Injectable()
export class UserService {
    private user: Observable<User>;

    private mock = {
        name: 'Мария Ивановна Петрова',
        signal: "01002",
        balance: "1296,49 р.",
        date: null
    };

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

    getProfile():Observable<User>{
       this.user = Observable.of(this.mock);
        return this.user;
    }

    getDate():string{
        return this.mock.date;
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}