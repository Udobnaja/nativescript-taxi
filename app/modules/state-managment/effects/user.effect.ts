
import { Injectable } from '@angular/core';

import { Store, Action } from '@ngrx/store';
import {Effect, Actions} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { NUser } from '../actions/';
import {UserService} from "../../../shared/user/user.service";
import {IUser} from "../../../shared/user/user.model";
import {AccountService} from "../../../shared/account/account.service";

@Injectable()
export class UserEffects {

    constructor(
        private store: Store<any>,
        private actions$:Actions,
        private userService: UserService,
        private accountService: AccountService
    ) { }

    @Effect() load$: Observable<Action> = this.actions$
        .ofType(NUser.ActionTypes.LOAD)
        .switchMap(() =>   this.userService.getProfile())
        .map((user:IUser) => new NUser.LoadedAction(user))
        .catch(() => Observable.of(new NUser.LoadFailedAction()));

    @Effect() loadAccount$: Observable<Action> = this.actions$
        .ofType(NUser.ActionTypes.LOAD_ACCOUNT)
        .switchMap(() =>   this.accountService.getAccount())
        .map((account) => new NUser.AccountLoadedAction(account))
        .catch(() => Observable.of(new NUser.LoadFailedAction()));




}

