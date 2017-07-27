import {IUser} from "./user.model";

export class User implements IUser{
    signal;
    password;
    name;
    balance;
    date;
}