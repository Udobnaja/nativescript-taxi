
import { Injectable } from "@angular/core";

import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";

import { NUser } from "../actions/";
import { UserService } from "../../../shared/services/user/user.service";
import { IUser } from "../../../shared/models/user/user.model";
import { AccountService } from "../../../shared/services/account/account.service";
import { IAccount } from "../../../shared/models/account/account.model";
import { RouterExtensions } from "nativescript-angular";

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private accountService: AccountService,
        private router: RouterExtensions
    ) {}

    @Effect() load$: Observable<Action> = this.actions$
        .ofType(NUser.ActionTypes.LOAD)
        .switchMap(() =>   this.userService.getProfile())
        .map((user: IUser) => new NUser.LoadedAction(user))
        .catch(() => Observable.of(new NUser.LoadFailedAction()));

    @Effect() loadAccount$: Observable<Action> = this.actions$
        .ofType(NUser.ActionTypes.LOAD_ACCOUNT)
        .switchMap(() => this.accountService.getAccount())
        .map((account) => new NUser.AccountLoadedAction(account))
        .catch(() => Observable.of(new NUser.LoadFailedAction()));

    @Effect() updateAccount$: Observable<Action> = this.actions$
        .ofType(NUser.ActionTypes.UPDATE)
        .switchMap(action => this.accountService.updateAccount(action["payload"])
            .map((account: IAccount) => { this.router.back(); return new NUser.UpdatedAction(account); })
            .catch((e) => Observable.of(new NUser.UpdateFailedAction(e.status || e.statusText))));
}
