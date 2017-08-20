import { UserInitialState } from '../states/';
import { NUser } from '../actions/';
import {IUserState} from "../states/user.state";

export function reducer(
    state: IUserState = UserInitialState,
    action: NUser.Actions
): IUserState {
    switch (action.type) {
        case NUser.ActionTypes.LOADED:
            return (<any>Object).assign({}, state, action.payload, {error: null});

        case NUser.ActionTypes.ACCOUNT_LOADED:
            return  (<any>Object).assign({}, state, {account: action.payload, error: null});

        case NUser.ActionTypes.UPDATED:
            return  (<any>Object).assign({}, state, {account: action.payload, error: null});

        case NUser.ActionTypes.UPDATE_FAILED:
            return (<any>Object).assign({}, state, {error: action.payload});
        default:
            return state;
    }
}
