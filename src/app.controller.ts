import { Controller, Get, Redirect } from '@nestjs/common';

import { AuthService } from './modules/auth/auth.service';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Redirect('/api')
  async redirectToAPIDocs() {}
}
