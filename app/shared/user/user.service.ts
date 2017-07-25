import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

// const jwt = require("jwt-js");

import { User } from "./user.class";
import { Config } from "../config";
import {Autopark} from "../autopark/autopark.class";

@Injectable()
export class UserService {
    constructor(private http: Http){

    }
    register({ signal, password }: User, {city, name}: Autopark) {

        let payload = {
            signal: signal,
            password: password,
            autopark: `${name}$${city}`,
        };

        var formData = new FormData();

        for (var k in payload) {
            formData.append(k, payload[k]);
        }

        // let secret = "S(=+]n)M`^..&U4Www_kMSN#bwTpE";
        //
        // // let token = new jwt.WebToken(JSON.stringify(payload));
        //
        // let token ="";
        //
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Accept","application/json");
        // headers.append("token", token);
        //
        // console.log(token);

        // return this.http.get(
        //     Config.taxiURL + "driver/info"
        // ).map(response => response.json())
        //  .do(() => {
        //      Config.token = token;
        //  })
        //  .catch(this.handleErrors);

        return this.http.post(
            "https://dgorod.com/auth",
            formData,
            { headers: headers }
        ).map(response => { console.log('hhhh',response); return response.json()})
        .do(data => {
           // Config.token = data.Result.access_token;
        }).catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}