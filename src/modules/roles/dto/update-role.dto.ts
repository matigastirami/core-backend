import { App } from "src/modules/apps/schema/app.schema";

export interface UpdateRoleDto {
    description: string,
    expirationDate: Date,
    allowedActions: string[],
    appId: App
}