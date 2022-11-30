import { AccountStatus } from "../enums/AccountStatus.mjs";
import { AccountType } from "../enums/AccountType.mjs";
import { CreateUserModel } from "../models/CreateUserModel.mjs";

export interface User extends CreateUserModel {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    accountType: AccountType;
    emailVerified: boolean;
    createdOn: string;
    createOnTS: number;
    active: boolean;
    status: AccountStatus;
}