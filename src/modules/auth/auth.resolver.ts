import { UseGuards, Logger } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { LocalAuthGuard } from "./guards/local-graphql.guard";
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService
  ) {}

  private readonly logger = new Logger(AuthResolver.name);

  
  @Mutation() 
  @UseGuards(LocalAuthGuard)
  async login(@Args('input') input: LoginDto) {
    return this.authService.login(input);
  }
}