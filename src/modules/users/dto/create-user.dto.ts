export interface CreateUserDto {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly surname: string;
}