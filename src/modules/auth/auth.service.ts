import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import Hash from '../../helpers/hash';
import { User, UserDocument } from '../users/schema/user.schema';
import { Company } from '../companies/schema/company.schema';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string, companyId: Company): Promise<any> {
    const user = await this.usersService.findOneByUserName(username, companyId);

    if (user && (await Hash.compare(pass, user.password))) {
      return { user };
    }
    return null;
  }

  async login(user: any, companyId?: string) {
    const payload = { ...user, companies: undefined, companyId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}