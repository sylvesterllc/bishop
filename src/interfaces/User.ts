import { AccountStatus } from "../enums/AccountStatus";
import { AccountType } from "../enums/AccountType";
import { CreateUserModel } from "../models/CreateUserModel";

export interface User extends CreateUserModel {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    accountType: AccountType;
    emailVerified: boolean;
    createdOn: Date;
    active: boolean;
    status: AccountStatus;
}