import { Action } from '@ngrx/store';
import { type } from '../../core/';
import {IUser} from "../../../shared/user/user.model";

export namespace NUser {
    export const CATEGORY: string = 'User';

    export interface IUserActions {
        LOAD: string;
        LOADED: string;
        LOAD_FAILED: string;
        LOAD_ACCOUNT: string;
        ACCOUNT_LOADED: string;
        ACCOUNT_FAILED: string;
    }

    export const ActionTypes: IUserActions = {
        LOAD: type(`${CATEGORY} Load`),
        LOADED: type(`${CATEGORY} Loaded successful`),
        LOAD_FAILED: type(`${CATEGORY} Load Failed`),
        LOAD_ACCOUNT: type(`${CATEGORY} Load Account`),
        ACCOUNT_LOADED: type(`${CATEGORY} Account Loaded successful`),
        ACCOUNT_FAILED: type(`${CATEGORY} Account Load Failed`),
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

    export type Actions
        = LoadAction
        | LoadedAction
        | LoadFailedAction
        | LoadAccountAction | AccountLoadedAction | AccountLoadFailedAction;
}