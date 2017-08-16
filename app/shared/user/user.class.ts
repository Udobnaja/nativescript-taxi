import {IUser} from "./user.model";
import {Account} from "../account/account.class";

export class User implements IUser{
    signal;
    password;
    name;
    balance;
    date;
    account;
    constructor(){
        this.account = new Account();
    }
}