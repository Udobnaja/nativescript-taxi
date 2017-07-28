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

    getDate():string{
      return  null;
    }

    saveDate(date:string){

    }


    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}