import crypto from '@helpers/crypto';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface UserAuthAccess {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class JwtPassport extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    try {
      const data = JSON.parse(crypto.decrypt(payload.data));

      return {
        id: data.sub,
        name: data.name,
        email: data.email,
        password: data.password,
      } as UserAuthAccess;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
