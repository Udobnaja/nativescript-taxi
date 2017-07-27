import { Action } from '@ngrx/store';
import { type } from '../../core/';
import {IUser} from "../../../shared/user/user.model";

export namespace NUser {
    export const CATEGORY: string = 'User';

    export interface IUserActions {
        LOAD: string;
        LOADED: string;
        LOAD_FAILED: string;
    }

    export const ActionTypes: IUserActions = {
        LOAD: type(`${CATEGORY} Load`),
        LOADED: type(`${CATEGORY} Loaded successful`),
        LOAD_FAILED: type(`${CATEGORY} Load Failed`),
    };

    export class LoadAction implements Action {
        type = ActionTypes.LOAD;

        constructor(public payload: any) { }
    }

    export class LoadedAction implements Action {
        type = ActionTypes.LOADED;

        constructor(public payload: IUser) {}
    }

    export class LoadFailedAction implements Action {
        type = ActionTypes.LOAD_FAILED;
        payload: string = null;
    }

    export type Actions
        = LoadAction
        | LoadedAction
        | LoadFailedAction;
}