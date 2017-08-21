import { Action } from '@ngrx/store';
import { type } from '../../core/';
import {IUser} from "../../../shared/models/user/user.model";
import {IAccount} from "../../../shared/models/account/account.model";

export namespace NUser {
    export const CATEGORY: string = 'User';

    export interface IUserActions {
        LOAD: string;
        LOADED: string;
        LOAD_FAILED: string;
        LOAD_ACCOUNT: string;
        ACCOUNT_LOADED: string;
        ACCOUNT_FAILED: string;
        UPDATE: string;
        UPDATED: string;
        UPDATE_FAILED: string;
    }

    export const ActionTypes: IUserActions = {
        LOAD: type(`${CATEGORY} Load`),
        LOADED: type(`${CATEGORY} Loaded successful`),
        LOAD_FAILED: type(`${CATEGORY} Load Failed`),
        LOAD_ACCOUNT: type(`${CATEGORY} Load Account`),
        ACCOUNT_LOADED: type(`${CATEGORY} Account Loaded successful`),
        ACCOUNT_FAILED: type(`${CATEGORY} Account Load Failed`),
        UPDATE: type(`${CATEGORY} Update Account`),
        UPDATED: type(`${CATEGORY} Account Updated successful`),
        UPDATE_FAILED: type(`${CATEGORY} Account Update Failed`),
    };

    export class LoadAction implements Action {
        type = ActionTypes.LOAD;
        payload:string = null;
    }

    export class LoadedAction implements Action {
        type = ActionTypes.LOADED;

        constructor(public payload: IUser) {}
    }

    export class LoadFailedAction implements Action {
        type = ActionTypes.LOAD_FAILED;
        payload: string = null;
    }

    export class LoadAccountAction implements Action {
        type = ActionTypes.LOAD_ACCOUNT;
        payload:string = null;
    }

    export class AccountLoadedAction implements Action {
        type = ActionTypes.ACCOUNT_LOADED;

        constructor(public payload: any) {}
    }

    export class AccountLoadFailedAction implements Action {
        type = ActionTypes.ACCOUNT_FAILED;
        payload: string = null;
    }

    export class UpdateAction implements Action {
        type = ActionTypes.UPDATE;

        constructor(public payload: IAccount) {}
    }

    export class UpdatedAction implements Action {
        type = ActionTypes.UPDATED;

        constructor(public payload: IAccount) {}
    }

    export class UpdateFailedAction implements Action {
        type = ActionTypes.UPDATE_FAILED;
        constructor(public payload: any) {}
    }

    export type Actions
        = LoadAction
        | LoadedAction
        | LoadFailedAction
        | LoadAccountAction | AccountLoadedAction | AccountLoadFailedAction | UpdateAction | UpdatedAction | UpdateFailedAction;
}