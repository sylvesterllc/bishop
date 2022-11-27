import env from "dotenv";
console.log(env.config());

import { UserManager } from "../src/classes/UserManager";
import { CreateUserModel } from "../src/models";

describe('My first test', () => {
    it.skip('Test 1', () => {
        const a = 1;
        const b = 2;

        const expectedAnswer = 3;

        const answer = a + b;

        expect(expectedAnswer).toBe(answer);
    });

    it.skip('Create Account', async () => {
        env.config();

        const userManager: UserManager  = new UserManager();
        const model2: CreateUserModel = {
            username: "davis1@owning.homes",
            email: "davis1@owning.homes",
            firstName: "Davis",
            lastName: "Sylvester",
            phoneNumber: "214-223-1413",
            password: "Password2022+",
            accountType: 8
        };


        let result;
        try {
            result = await userManager.createAccount(model2);
            console.log('AAAA', result.$metadata.httpStatusCode)

        } catch (err) {
            console.log('i hit an error')
            console.log('Error: ', err)
        }

        expect(result?.$metadata?.httpStatusCode).toBe(200);
    });

    it.skip('Create Duplicate Account', async () => {
        env.config();

        const userManager = new UserManager();

        const model2: CreateUserModel = {
            username: "dddaa@aa.com",
            email: "dddaaa@aa.com",
            firstName: "DDDDDDD",
            lastName: "ZZZZZZZ",
            phoneNumber: "1555-555-1212",
            password: "Password2022+",
            accountType: 8
        };



        try {
            const result = await userManager.createAccount(model2);
            expect(result.$metadata.httpStatusCode).not.toBe(200);

        } catch (err: any) {
            console.log(err);
        }

    });

    it('Get List of Accounts', async () => {
        env.config();

        const service = new UserManager();


        try {
            const result = await service.getUsers();
            console.log('result', result);

            expect(result.length).toBe(1);

        } catch (err: any) {
            console.log(err);
        }

    });

    it.skip('Confirm Accounts', async () => {
        env.config();

        const service = new UserManager();
        const username = 'dd@aa.com';

        try {
            const result = await service.confirmAccount(username);

            console.log('result', result);

            expect(result.$metadata.httpStatusCode).toBe(200);

        } catch (err: any) {


            console.log(err);
        }

    });
});