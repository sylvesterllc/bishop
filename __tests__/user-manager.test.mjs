var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as env from "dotenv";
import { UserManager } from "../app/src/classes/UserManager.mjs";
import { AccountHelper } from "../app/src/helpers/account-helper.mjs";
let userManager;
beforeAll(() => {
    env.config();
    userManager = new UserManager();
});
describe('Account Creation', () => {
    test('Create a user account', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = AccountHelper.CreateAccountData();
        const result = yield userManager.createAccount(data);
        expect(result.$metadata.httpStatusCode).toBe(200);
    }));
    it.skip('Create Account', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userManager = new UserManager();
        const model2 = AccountHelper.CreateAccountData();
        let result;
        try {
            result = yield userManager.createAccount(model2);
            console.log('AAAA', result.$metadata.httpStatusCode);
        }
        catch (err) {
            console.log('i hit an error');
            console.log('Error: ', err);
        }
        expect((_a = result === null || result === void 0 ? void 0 : result.$metadata) === null || _a === void 0 ? void 0 : _a.httpStatusCode).toBe(200);
    }));
    it.skip('Create Duplicate Account', () => __awaiter(void 0, void 0, void 0, function* () {
        const userManager = new UserManager();
        const model2 = AccountHelper.CreateAccountData();
        try {
            const result = yield userManager.createAccount(model2);
            expect(result.$metadata.httpStatusCode).not.toBe(200);
        }
        catch (err) {
            console.log(err);
        }
    }));
    it('Get List of Accounts', () => __awaiter(void 0, void 0, void 0, function* () {
        const service = new UserManager();
        try {
            const result = yield service.getUsers();
            console.log('result', result);
            expect(result.length).toBe(1);
        }
        catch (err) {
            console.log(err);
        }
    }));
    it.skip('Confirm Accounts', () => __awaiter(void 0, void 0, void 0, function* () {
        const service = new UserManager();
        const username = 'dd@aa.com';
        try {
            const result = yield service.confirmAccount(username);
            console.log('result', result);
            expect(result.$metadata.httpStatusCode).toBe(200);
        }
        catch (err) {
            console.log(err);
        }
    }));
});
//# sourceMappingURL=user-manager.test.mjs.map