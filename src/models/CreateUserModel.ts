import { AccountType } from "../enums/AccountType";

export interface CreateUserModel {

    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    accountType: AccountType;
}