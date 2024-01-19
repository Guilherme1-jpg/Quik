import { LocalStrategy } from '@auth/passportEstrategy/local.passport';
import { Auth } from '@auth/service/auth';
import { Controller, Post, Req, UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: Auth,
    private readonly localStrategy: LocalStrategy,
  ) {}

  @Post('login')
  async login(@Req() req: any) {
    try {
      const user = await this.localStrategy.validate({ body: req.body });

      if (!user) {
        throw new UnauthorizedException('Email or password is invalid');
      }

      const authLogin = await this.auth.login(user);

      return {
        expiresIn: process.env.JWT_EXPIRES_IN,
        token: authLogin.token,
      };
    } catch (error) {
      console.error('Error in AuthController.login:', error);
      throw new UnauthorizedException('Email or password is invalid');
    }
  }
}
