import { UserCustoms } from "./UserCustoms.mjs";

export interface UpdateUserModel {
    token: string;
    userAttributes: UserCustoms[];
}