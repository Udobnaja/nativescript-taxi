import { IUser } from "../../../shared/models/user/user.model";


export interface IUserState extends IUser {
    info: {};
    error: any;
}
/* tslint:disable:variable-name */
export const UserInitialState: IUserState = null;
/* tslint:enable:variable-name */
