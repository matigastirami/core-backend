import { App } from "src/modules/apps/schema/app.schema";

export interface CreateRoleDto {
    code: string,
    description: string,
    expirationDate: Date,
    allowedActions: string[],
    appId: App
}