
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class LoginInput {
    username: string;
    password: string;
}

export class AddPermission {
    app: string;
    roles: string[];
    userId: string;
}

export class RemovePermission {
    app: string;
    roles?: string[];
    userId: string;
}

export class ChangePassword {
    id: string;
    oldPassword: string;
    newPassword: string;
}

export class CreateUserInput {
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
}

export class UserFilter {
    username?: string;
    email?: string;
}

export class LoginOutput {
    access_token: string;
}

export abstract class IMutation {
    abstract login(input: LoginInput): LoginOutput | Promise<LoginOutput>;

    abstract addPermissionsToUser(input: AddPermission): Permission | Promise<Permission>;

    abstract removePermissionsFromUser(input: RemovePermission): Permission | Promise<Permission>;

    abstract changeUserPassword(input: ChangePassword): User | Promise<User>;

    abstract deleteUser(id: string): User | Promise<User>;

    abstract createUser(input: CreateUserInput): User | Promise<User>;
}

export class Permission {
    _id?: string;
    app: string;
    roles: string[];
    userId: string;
}

export abstract class IQuery {
    abstract getUserPermissions(id: string): Permission[] | Promise<Permission[]>;

    abstract user(id: string): User | Promise<User>;

    abstract users(filter: UserFilter): User[] | Promise<User[]>;
}

export class User {
    _id?: string;
    username?: string;
    email?: string;
    password?: string;
    name?: string;
    surname?: string;
}
