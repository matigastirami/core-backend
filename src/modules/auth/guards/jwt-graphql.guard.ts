import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTGqlAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(@Inject('JwtService') private readonly jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().request;
    const Authorization = request.get('Authorization');

    if (Authorization) {
      const token = Authorization.replace('Bearer ', '');
      const userId = this.jwtService.verify(token);
      return !!userId;
    }
  }
}
