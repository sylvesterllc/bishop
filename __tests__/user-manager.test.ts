import * as env from "dotenv";
env.config();
import { UserManager } from "../src/classes/UserManager.mjs";
import { AccountHelper } from "../src/helpers/account-helper.mjs";
import { CreateUserModel } from "../src/models/CreateUserModel.mjs";

let userManager: UserManager;

beforeAll(() => {

  userManager = new UserManager();
});

describe('Account Creation', () => {

  test.skip('Create a user account', async () => {

    const data: CreateUserModel = AccountHelper.CreateAccountData();

    const result = await userManager.createAccount(data);

    expect(result.$metadata.httpStatusCode).toBe(200);

  });

  it.skip('Create Account', async () => {


    const userManager: UserManager = new UserManager();
    const model2: CreateUserModel = AccountHelper.CreateAccountData();


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

    const model2: CreateUserModel = AccountHelper.CreateAccountData();

    try {
      const result = await userManager.createAccount(model2);
      expect(result.$metadata.httpStatusCode).not.toBe(200);

    } catch (err: any) {
      console.log(err);
    }

  });

  it('Get List of Accounts', async () => {


    const service = new UserManager();

    let actual = 0;

    try {
      const result = await service.getUsers();
      console.log('result', result);

      actual = result?.length || 0;

    } catch (err: any) {
      console.log(err);
    }
    expect(actual).toEqual(2);
  });

  it.skip('Confirm Accounts', async () => {


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