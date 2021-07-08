import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Company } from 'src/modules/companies/schema/company.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  private readonly logger = new Logger(LocalStrategy.name);

  async validate(username: string, password: string, companyId?: Company): Promise<any> {
    
    this.logger.log('Validate user called');

    const user = await this.authService.validateUser(username, password, companyId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}