import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Config } from "../config";
import { Observable } from "rxjs/Observable";

@Injectable()
export class InterceptedHttp implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = localStorage.getItem("token");

        const authReq = req.clone({
            setHeaders: {'Content-Type': 'application/json', 'x-driver-auth': token ? token : ''},
            url:  `${Config.APIURL}${req.url}`
        });

        return next.handle(authReq);
    }

}
