import {IAccount} from "../account/account.model";

export interface IUser{
    signal: string;
    password: string;
    name: string;
    balance: string;
    date: string;
    account: IAccount;
}