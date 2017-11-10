import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { LatLng } from "../../models/latLng/latLng.class";
import { AppModule } from "../../../app.module";
import { ErrorService } from "../error/error.service";

@Injectable()
export class GPSService extends ErrorService {
    private httpService;
    constructor() {
        super();
        this.httpService = AppModule.injector.get(Http);
    }

    sendLocation(latLng: LatLng) {
        return this.httpService.post("driver/gps", latLng).map(res => res.json()).catch(this.handleErrors);
    }
}
