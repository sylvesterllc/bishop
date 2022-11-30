import * as env from "dotenv";

import { UserManager } from "../app/src/classes/UserManager.mjs";
import { AccountHelper } from "../app/src/helpers/account-helper.mjs";
import { CreateUserModel } from "../app/src/models/index.mjs";

let userManager;

beforeAll(() => {
  env.config();
  userManager = new UserManager();
});

describe('Account Creation', () => {

  test('Create a user account', async () => {

    const data = AccountHelper.CreateAccountData();

    const result = await userManager.createAccount(data);

    expect(result.$metadata.httpStatusCode).toBe(200);

  });

  it.skip('Create Account', async () => {


    const userManager = new UserManager();
    const model2 = AccountHelper.CreateAccountData();


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

    const userManager = new UserManager();

    const model2 = AccountHelper.CreateAccountData();

    try {
      const result = await userManager.createAccount(model2);
      expect(result.$metadata.httpStatusCode).not.toBe(200);

    } catch (err) {
      console.log(err);
    }

  });

  it('Get List of Accounts', async () => {


    const service = new UserManager();


    try {
      const result = await service.getUsers();
      console.log('result', result);

      expect(result.length).toBe(1);

    } catch (err) {
      console.log(err);
    }

  });

  it.skip('Confirm Accounts', async () => {


    const service = new UserManager();
    const username = 'dd@aa.com';

    try {
      const result = await service.confirmAccount(username);

      console.log('result', result);

      expect(result.$metadata.httpStatusCode).toBe(200);

    } catch (err) {


      console.log(err);
    }

  });
});