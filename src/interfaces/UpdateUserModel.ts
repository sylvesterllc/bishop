import { UserCustoms } from "./UserCustoms";

export interface UpdateUserModel {
    token: string;
    userAttributes: UserCustoms[];
}