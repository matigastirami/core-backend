import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Company } from "src/modules/companies/schema/company.schema";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') implements CanActivate{

    constructor(private readonly authService: AuthService) {
        super();
    }  

    private readonly logger = new Logger(LocalAuthGuard.name);

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);        
        const request  = ctx.getContext();

        request.body = ctx.getArgs();

        const { username, password } = request.body.input;

        let isValid = await this.authService.validateUser(username, password, {} as Company);

        isValid = !!isValid;

        if(!isValid) throw new UnauthorizedException();

        return true;
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request  = ctx.getContext();
        request.body = ctx.getArgs();
        return request;
    }
}