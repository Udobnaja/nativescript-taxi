import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


@Injectable()
export class UserService {

    constructor(private http: Http){

    }

    getProfile(){
        return this.http.get("driver/info")
            .map(res => res.json().driver).catch(this.handleErrors)
    }

    checkBik(bic){
        return this.http.get(`validate_bic/${bic}`).map(res => res.json()).catch(this.handleErrors)
    }

    getDate():string{
      return  null;
    }

    saveDate(date:string){

    }


    private handleErrors(error: Response) {
        return Observable.throw(error);
    }
}