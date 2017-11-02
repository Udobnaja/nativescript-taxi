import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { LatLng } from '../../models/latLng/latLng.class';
import {AppModule} from "../../../app.module";
import {Observable} from "rxjs";

@Injectable()
export class GPSService {
    private httpService;
    private gpsService;
    constructor(){
        this.httpService = AppModule.injector.get(Http);
        // this.gpsService = AppModule.injector.get(GPSService);
    }
    //
    sendLocation(latLng: LatLng) {
        return this.httpService.post("driver/gps", latLng).map(res => res.json()).catch(this.handleErrors);
    }

    private handleErrors(error: Response) {
        return Observable.throw(error);
    }
}