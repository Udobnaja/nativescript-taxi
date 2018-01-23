import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class AutoparkListService {
    constructor(private http: HttpClient) {}

    load() {
        return this.http.get("autoparks");
    }
}
