import { ApiProperty } from "@nestjs/swagger";

export class FilterUserDto {
    @ApiProperty({ required: false })
    readonly username?: string;

    @ApiProperty({ required: false })
    readonly email?: string;
}