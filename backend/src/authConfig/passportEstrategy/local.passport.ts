import { Auth } from '../service/auth';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';

export interface LoginBody {
  email: string;
  password: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: Auth) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(request: { body: LoginBody }) {
    const { email, password } = request.body;

    const user = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new UnauthorizedException('Email or password is invalid');
    }

    return user;
  }
}
