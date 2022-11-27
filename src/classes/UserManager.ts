import {
    AdminDeleteUserCommand, AdminDeleteUserCommandInput, AdminGetUserCommand, AdminGetUserCommandInput, AuthFlowType, ChangePasswordCommand, ChangePasswordCommandInput, CognitoIdentityProviderClient, CognitoIdentityProviderClientConfig, ConfirmSignUpCommand, ConfirmSignUpCommandInput, GetUserCommand, GetUserCommandInput, InitiateAuthCommand, ListUsersCommand,
    ListUsersCommandInput, ResendConfirmationCodeCommand, ResendConfirmationCodeCommandInput, SignUpCommand, SignUpCommandInput, UpdateUserAttributesCommand, UpdateUserAttributesCommandInput
} from "@aws-sdk/client-cognito-identity-provider";
import moment from "moment";
import { APP_CONIFG } from "../config/AppConfig";
import { AccountStatus } from "../enums/AccountStatus";
import { AccountType } from "../enums/AccountType";
import { LoginModel, UpdateUserModel } from "../interfaces";
import { ChangePasswordModel } from "../interfaces/ChangePasswordModel";
import { ConfirmationResendModel } from "../interfaces/ConfirmationResendModel";
import { PagingModel } from "../interfaces/PagingModel";
import { User } from "../interfaces/User";
import { ConfirmCodeModel, CreateUserModel } from "../models";


export class UserManager {


    private _client: CognitoIdentityProviderClient;

    constructor() {

        const clientData = this.setClientData();
        this._client = new CognitoIdentityProviderClient(clientData);
    }

    private setClientData() {

        let clientData: CognitoIdentityProviderClientConfig = {
            region: process.env.AWS_REGION || 'us-east-1',
        };

        if (!process.env.AWS_ACCESS_KEY || !process.env.AWS_SECRET_KEY) {
            return clientData;
        }

        clientData = {
            ...clientData,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            }
        };

        return clientData
    }

    public async getUsers(model?: PagingModel) {

        if (!model) {
            model = {
                limit: 50,
                nextPageToken: "",
            };
        }
        console.log('USER POOL ID', APP_CONIFG.USER_POOL_ID);

        const commandInput: ListUsersCommandInput = {
            UserPoolId: APP_CONIFG.USER_POOL_ID,
            Limit: model.limit,
            PaginationToken: (model.nextPageToken) ? model.nextPageToken : undefined
        };

        console.log('commandInput', commandInput);

        const command = new ListUsersCommand(commandInput);

        console.log('command', command);

        const tempResult = await this._client.send(command);

        console.log('### tempResult ###', tempResult);
        const result: User[] = [];

        let user: User = {
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            password: "",
            active: false,
            accountType: AccountType.Client,
            emailVerified: false,
            createdOn: new Date(),
            status: AccountStatus.NeedConfirmation
        };

        tempResult.Users!.map((x) => {

            user.username = x.Username!;
            user.active = (x.Enabled) ? true : false;
            user.status = (x.UserStatus === AccountStatus.Active) ? AccountStatus.Active :
                (x.UserStatus === AccountStatus.NeedConfirmation) ? AccountStatus.NeedConfirmation
                    : AccountStatus.PasswordChangeRequired;

            x.Attributes!.map((y) => {

                switch (y.Name) {
                    case "email":
                        user.email = y.Value!;
                        break;
                    case "custom:acccountType":
                        user.accountType = parseInt(y.Value!) || AccountType.Client;
                        break;

                    case "email_verified":
                        user.emailVerified = (y.Value! === 'false') ? false : true;
                        break;

                    case "custom:firstName":
                        user.firstName = y.Value!;
                        break;

                    case "custom:lastName":
                        user.lastName = y.Value!;
                        break;

                    case "custom:phoneNumber":
                        user.phoneNumber = y.Value!;
                        break;

                    case "custom:joinedOn":
                        user.createdOn = moment(y.Value!).toDate();
                        break;
                }
            });

            result.push(user);

            user = {
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                password: "",
                accountType: AccountType.Client,
                emailVerified: false,
                createdOn: new Date(),
                active: false,
                status: AccountStatus.NeedConfirmation,
            };
        });

        return result;
    }

    public async confirmAccount(username: string) {

        const modifiedUserName = this.getModifiedUsername(username);

        const input: AdminGetUserCommandInput = {
            UserPoolId: APP_CONIFG.USER_POOL_ID,
            Username: modifiedUserName,
        };

        const command: AdminGetUserCommand = new AdminGetUserCommand(input);

        const tempResult = await this._client.send(command);

        return tempResult;
    }

    public async confirmCode(data: ConfirmCodeModel) {

        const input: ConfirmSignUpCommandInput = {
            ClientId: APP_CONIFG.COGNITO_CLIENT_ID,
            ConfirmationCode: data.code!,
            Username: this.getModifiedUsername(data.email),

        };

        console.log('### input ###', input);

        const command: ConfirmSignUpCommand = new ConfirmSignUpCommand(input);

        const tempResult = await this._client.send(command);

        return tempResult;
    }

    public async deleteUser(email: string) {

        const input: AdminDeleteUserCommandInput = {
            UserPoolId: APP_CONIFG.USER_POOL_ID,
            Username: email
        };

        const command: AdminDeleteUserCommand = new AdminDeleteUserCommand(input);

        const tempResult = await this._client.send(command);

        return tempResult;
    }

    public async changePassword(model: ChangePasswordModel) {

        const input: ChangePasswordCommandInput = {
            AccessToken: model.accessToken,
            PreviousPassword: model.oldPassword,
            ProposedPassword: model.newPassword,
        };

        const command: ChangePasswordCommand = new ChangePasswordCommand(input);

        const tempResult = await this._client.send(command);

        return tempResult;
    }

    public async createAccount(model: CreateUserModel) {

        const clientData: CognitoIdentityProviderClientConfig = {
            region: process.env.AWS_REGION || 'us-east-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY || '',
                secretAccessKey: process.env.AWS_SECRET_KEY || '',
            },
        };

        const client = new CognitoIdentityProviderClient(clientData);

        const email = model.email;

        const createUserParams: SignUpCommandInput = {
            ClientId: process.env.AWS_COGNITO_CLIENT_ID,
            Username: model.email.replace("@", "_").replace(".", "_"),
            Password: model.password,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: model.email
                },
                {
                    Name: 'custom:firstName',
                    Value: model.firstName
                },
                {
                    Name: 'custom:lastName',
                    Value: model.lastName
                },
                {
                    Name: 'custom:phoneNumber',
                    Value: `1${model.phoneNumber.replace("-", "").replace("(", "").replace(")", "").replace(".", "")}`
                },
                {
                    Name: 'custom:joinedOn',
                    // @ts-ignore
                    Value: moment().utc().format("YYYY-MM-DD hh:mm:ss z")
                },
                {
                    Name: 'custom:acccountType',
                    Value: model.accountType.toString()
                },


            ],
            ValidationData: [

            ],

        }

        const signUpCommand = new SignUpCommand(createUserParams);

        try {
            const tempResult = await client.send(signUpCommand);

            console.log('Success', tempResult);

            return tempResult;

        } catch (error: any) {
            console.log('error_type: ', error.__type);
            console.log('### RAW ERROR ###: ', error);

            const amazonErrorMessage = error.__type.$response.headers["x-amzn-errormessage"];
            const amazonErrorType = error.__type.$response.headers["x-amzn-errortype"];

            // console.log('Signup Command threw an error:  ', error);
            switch (error.__type) {

                case 'InvalidPasswordException':
                    throw new Error(`Your Password doesn't meet complexity`);

                case 'UsernameExistsException':
                    throw new Error(`${model.email} already has an account`);

                case 'LimitExceededException':
                    throw new Error(`### Amazon Error Message: ${amazonErrorMessage}### \n
                    ### Amazon Error Type: ${amazonErrorType}  ### \n`);
                default:
                    throw new Error(`Error creating your account: \t${error.__type}`);
            }
        }
    }

    public async getUser(token: string) {

        const input: GetUserCommandInput = {
            AccessToken: token,
        };

        const command: GetUserCommand = new GetUserCommand(input);

        const tempResult = await this._client.send(command);

        return tempResult;
    }

    public async checkLogin(model: LoginModel) {

        const command = new InitiateAuthCommand({
            AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
            AuthParameters: {
                USERNAME: this.getModifiedUsername(model.username),
                PASSWORD: model.password,
            },
            ClientId: APP_CONIFG.COGNITO_CLIENT_ID,
        });


        const result = await this._client.send(command);

        return result;
    }

    public async updateUser(model: UpdateUserModel) {

        const input: UpdateUserAttributesCommandInput = {
            UserAttributes: model.userAttributes,
            AccessToken: model.token
        };

        const command: UpdateUserAttributesCommand = new UpdateUserAttributesCommand(input);

        const tempResult = await this._client.send(command);

        return tempResult;

    }

    public async resendConfirmationCode(model: ConfirmationResendModel) {

        const input: ResendConfirmationCodeCommandInput = {
            ClientId: APP_CONIFG.COGNITO_CLIENT_ID,
            Username: this.getModifiedUsername(model.email),
        };

        const command: ResendConfirmationCodeCommand = new ResendConfirmationCodeCommand(input);

        const tempResult = await this._client.send(command);

        return tempResult;

    }

    private cl(message: string) {
        console.log(message);
    }

    private getModifiedUsername(email: string, reverse: boolean = false) {

        const regex = /\@/g;
        const periodRegex = /\./g;

        const username = email.replace(regex, "_").replace(periodRegex, "_");
        return username;
    }
}