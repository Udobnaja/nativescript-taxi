import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

import { Config } from "../config";
import {Autopark} from "./autopark.class";
import {AutoparkInterface} from "./autopark.model";

@Injectable()
export class AutoparkListService {
    constructor(private http: Http) {}

    load() {
        let headers = new Headers();

        return this.http.get(Config.taxiURL + "autoparks", {
            headers: headers
        }).map(res => res.json()).map(data => {
            let autoparkList:AutoparkInterface[] = [];
            data["autoparks"].forEach((autopark) => {
                autoparkList.push(new Autopark(autopark.city, autopark.name, autopark.title));
            });
            return autoparkList;
        }).catch(this.handleErrors);

    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}