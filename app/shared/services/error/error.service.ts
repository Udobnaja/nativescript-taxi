import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ErrorService {
    protected handleErrors(error: Response) {
        return Observable.throw(error);
    }
}