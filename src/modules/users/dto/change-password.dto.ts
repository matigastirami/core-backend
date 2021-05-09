import { ApiProperty } from "@nestjs/swagger";
import { User } from "../schema/user.schema";

export class ChangePasswordDto {

    @ApiProperty({ description: 'User _id', type: String })
    id: string;

    @ApiProperty({ description: 'The password you try to change', type: String })
    oldPassword: string;

    @ApiProperty({ description: 'The password that is going to replace the old one' })
    newPassword: string;

    
}