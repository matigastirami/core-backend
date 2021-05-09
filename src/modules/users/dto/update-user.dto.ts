import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty()
    readonly username: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly surname: string;
}