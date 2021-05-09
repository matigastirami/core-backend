import { ApiProperty } from "@nestjs/swagger";
import { App } from "src/modules/apps/schema/app.schema";
import { Role } from "src/modules/roles/schema/role.schema";
import { User } from "../schema/user.schema";

export class AddPermissionDto {
    @ApiProperty({ description: 'App _id', type: String })
    app: App;

    @ApiProperty({ description: 'Array of roles _id\'s' })
    roles: Role[];

    @ApiProperty({ description: 'User _id', type: String })
    userId: User;
}