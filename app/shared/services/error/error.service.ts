import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from '@angular/http';

@Injectable()
export class ErrorService {
    protected handleErrors(error: Response) {
        return Observable.throw(error);
    }
}
