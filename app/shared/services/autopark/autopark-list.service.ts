import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import {Autopark} from "../../models/autopark/autopark.class";
import {IAutopark} from "../../models/autopark/autopark.model";
import {ErrorService} from "../error/error.service";

@Injectable()
export class AutoparkListService extends ErrorService {
    constructor(private http: Http) {
        super();
    }

    load() {
        return this.http.get("autoparks").map(res => res.json()).map(data => {
            let autoparkList:IAutopark[] = [];
            data["autoparks"].forEach((autopark) => {
                autoparkList.push(new Autopark(autopark.city, autopark.name, autopark.title));
            });
            return autoparkList;
        }).catch(this.handleErrors);

    }
}