import { IAccount } from "./account.model";

export class Account implements IAccount {
    bic;
    fio;
    /* tslint:disable:variable-name */
    bnk_corr;
    /* tslint:enable:variable-name */
}
