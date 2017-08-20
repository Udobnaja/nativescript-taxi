import { Observable } from 'rxjs/Observable';
import {IUser} from "../../../shared/user/user.model";


export interface IUserState extends IUser{
    info:{},
    error: any
}
export const UserInitialState: IUserState = null;
