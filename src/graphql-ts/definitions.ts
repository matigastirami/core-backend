
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class User {
    _id: string;
    username?: string;
    email?: string;
    password?: string;
    name?: string;
    surname?: string;
}

export abstract class IQuery {
    abstract user(id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract deleteUser(id: string): User | Promise<User>;
}
