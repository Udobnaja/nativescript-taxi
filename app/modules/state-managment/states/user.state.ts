import { Observable } from 'rxjs/Observable';
import {IUser} from "../../../shared/user/user.model";


export interface IUserState {
    user: IUser
}
//
export const UserInitialState: IUserState = {
    user: null
};
//
// // selects specific slice from sample state
// export function getUser(state$: Observable<IUserState>) {
//     return state$.select(state => state.user);
// }