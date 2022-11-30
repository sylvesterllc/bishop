import { PhoneNumberHelper } from "@sylvesterllc/utility-helper";
import { AccountType, CreateUserModel } from "../models/index.mjs";

export class AccountHelper {

    static CreateAccountData(index: number = 1) {

        const account: CreateUserModel = {
            email: `test-user${index}@bishop.priv`,
            firstName: `Test`,
            lastName: `User ${index}`,
            phoneNumber: PhoneNumberHelper.generate(),
            password: "Password2022+",
            accountType: AccountType.USER
        };

        return account;
    }
}