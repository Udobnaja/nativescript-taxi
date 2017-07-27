import { Observable } from 'rxjs/Observable';
// import { combineLatest } from 'rxjs/observable/combineLatest';
import {ActionReducer, compose, Store} from '@ngrx/store';
// import '@ngrx/core/add/operator/select';
// import { compose } from '@ngrx/core/compose';
// import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as fromUser from '../state-managment/';
import { ActionReducerMap } from '@ngrx/store';



export interface IAppState{
    user: fromUser.IUserState;
}

export const reducers: ActionReducerMap<IAppState> = {
    user: fromUser.reducer,
};


// const productionReducer: ActionReducer<IAppState> = combineReducers(reducers);
//
// export function AppReducer(state: any, action: any) {
//     return productionReducer(state, action);
// }
//
// export function getUserState(state$: Observable<IAppState>): Observable<fromUser.IUserState> {
//     return state$.select(s => s.user);
// }
//
// export const getUser: any = compose(fromUser.getUser, getUserState);