
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateApp {
    code: string;
    description: string;
    url: string;
}

export class UpdateApp {
    description: string;
    url: string;
}

export class LoginInput {
    username: string;
    password: string;
}

export class CreateCompany {
    name: string;
    description: string;
    page_url?: string;
    logo_url?: string;
    location?: string;
}

export class UpdateCompany {
    name: string;
    description: string;
    page_url?: string;
    logo_url?: string;
    location?: string;
}

export class EnableDisableCompany {
    enabled: boolean;
}

export class CreateRole {
    code: string;
    description: string;
    expirationDate: Date;
    allowedActions: string[];
    appId: string;
}

export class UpdateRole {
    code: string;
    description: string;
    expirationDate: Date;
    allowedActions: string[];
    appId: string;
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

export class App {
    code: string;
    description: string;
    url: string;
}

export abstract class IQuery {
    abstract app(id: string): App | Promise<App>;

    abstract apps(): App[] | Promise<App[]>;

    abstract company(id: string): Company | Promise<Company>;

    abstract companies(): Company[] | Promise<Company[]>;

    abstract role(id: string): Role | Promise<Role>;

    abstract roles(): Role[] | Promise<Role[]>;

    abstract getUserPermissions(id: string): Permission[] | Promise<Permission[]>;

    abstract user(id: string): User | Promise<User>;

    abstract users(filter: UserFilter): User[] | Promise<User[]>;
}

export abstract class IMutation {
    abstract createApp(input: CreateApp): App | Promise<App>;

    abstract updateApp(id: string, input: UpdateApp): App | Promise<App>;

    abstract deleteApp(id: string): App | Promise<App>;

    abstract login(input: LoginInput): LoginOutput | Promise<LoginOutput>;

    abstract createCompany(input: CreateCompany): Company | Promise<Company>;

    abstract updateCompany(id: string, input: UpdateCompany): Company | Promise<Company>;

    abstract deleteCompany(id: string): Company | Promise<Company>;

    abstract disableCompany(id: string): Company | Promise<Company>;

    abstract enableCompany(id: string): Company | Promise<Company>;

    abstract createRole(input?: CreateRole): Role | Promise<Role>;

    abstract updateRole(id?: string, input?: UpdateRole): Role | Promise<Role>;

    abstract deleteRole(id: string): Role | Promise<Role>;

    abstract addPermissionsToUser(input: AddPermission): Permission | Promise<Permission>;

    abstract removePermissionsFromUser(input: RemovePermission): Permission | Promise<Permission>;

    abstract changeUserPassword(input: ChangePassword): User | Promise<User>;

    abstract deleteUser(id: string): User | Promise<User>;

    abstract createUser(input: CreateUserInput): User | Promise<User>;
}

export class LoginOutput {
    access_token: string;
}

export class Company {
    _id?: string;
    name: string;
    description: string;
    page_url?: string;
    logo_url?: string;
    location?: string;
    enabled?: boolean;
}

export class Role {
    code: string;
    description: string;
    expirationDate: Date;
    allowedActions: string[];
    appId: string;
}

export class Permission {
    _id?: string;
    app: string;
    roles: string[];
    userId: string;
}

export class User {
    _id?: string;
    username?: string;
    email?: string;
    password?: string;
    name?: string;
    surname?: string;
}
