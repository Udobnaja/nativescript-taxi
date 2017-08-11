import { UserInitialState } from '../states/';
import { NUser } from '../actions/';
import {IUserState} from "../states/user.state";

export function reducer(
    state: IUserState = UserInitialState,
    action: NUser.Actions
): IUserState {
    switch (action.type) {
        case NUser.ActionTypes.LOADED:
            return (<any>Object).assign({}, state, action.payload);

        case NUser.ActionTypes.ACCOUNT_LOADED:
            return  (<any>Object).assign({}, state, {account: action.payload});

        default:
            return state;
    }
}