
import { Injectable } from '@angular/core';

import { Store, Action } from '@ngrx/store';
import {Effect, Actions} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { NUser } from '../actions/';
import {UserService} from "../../../shared/user/user.service";
import {IUser} from "../../../shared/user/user.model";

@Injectable()
export class UserEffects {

    constructor(
        private store: Store<any>,
        private actions$:Actions,
        private userService: UserService
    ) { }

    @Effect() load$: Observable<Action> = this.actions$
        .ofType(NUser.ActionTypes.LOAD)
        .switchMap(payload =>   this.userService.getProfile(payload))
        .map((user:IUser) => new NUser.LoadedAction(user))
        .catch(() => Observable.of(new NUser.LoadFailedAction()));




}

