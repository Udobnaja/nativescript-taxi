import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { ErrorService } from "../error/error.service";

@Injectable()
export class UserService extends ErrorService {

    constructor(private http: Http) {
        super();
    }

    getProfile() {
        return this.http.get("driver/info")
            .map(res => res.json().driver).catch(this.handleErrors);
    }

    checkBik(bic) {
        return this.http.get(`validate_bic/${bic}`).map(res => res.json()).catch(this.handleErrors);
    }

    getDate(): string {
      return  null;
    }

    saveDate(date: string) {

    }
}
