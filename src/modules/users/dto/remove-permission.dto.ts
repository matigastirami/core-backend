import { App } from "src/modules/apps/schema/app.schema";
import { Role } from "src/modules/roles/schema/role.schema";
import { User } from "../schema/user.schema";

export interface RemovePermissionDto {
    app: App,
    roles?: Role[],
    userId: User
}