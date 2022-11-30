import { AccountType } from "../enums/AccountType.mjs";

export interface CreateUserModel {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    accountType: AccountType;
}