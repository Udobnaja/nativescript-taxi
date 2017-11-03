import { combineReducers } from '@ngrx/store';

import * as fromUser from '../state-managment/';
import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
    user: fromUser.IUserState;
}

export const reducers: ActionReducerMap<IAppState> = {
    user: fromUser.reducer,
};