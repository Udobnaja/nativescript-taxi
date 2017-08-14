import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


@Injectable()
export class AuthService {

    constructor(private http: Http){

    }

    auth(data){
        let {signal, password} = data.user;
        let {city, name} = data.autopark;
        localStorage.setItem('token', `${signal}:${password}:${city}:${name}`);
        return this.http.get("driver/info").map(res => res).catch(this.handleErrors);
    }

    private handleErrors(error: Response) {
        let message =  (error.status === 404) ? 'Такого пользователя не существует' : 'Произошла ошибка';
        localStorage.removeItem('token');
        return Observable.throw(new Error(message));
    }
}