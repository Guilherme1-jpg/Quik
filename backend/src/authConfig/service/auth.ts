import { User } from '@domain/users/entities/user';
import { UserRepository } from '@domain/users/repositories/user-repositories';
import crypto from '@helpers/crypto';
import { JwtService } from '@nestjs/jwt';
import { LoginBody } from '../passportEstrategy/local.passport';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Auth {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const data = crypto.encrypt(
      JSON.stringify({
        email: user?.email,
        password: user?.password,
      }),
    );

    const payload = {
      sub: user?.id,
      data,
    };

    return {
      token: this.jwtService.sign(payload, {
        secret: `${process.env.JWT_SECRET_KEY}`,
      }),
    };
  }

  async validateUser(loginBody: LoginBody) {
    const { email } = loginBody;
    try {
      const userData = await this.userRepository.findOne({ email });

      if (!userData) {
        return null;
      }

      const isPasswordIsValid = await bcrypt.compare(
        loginBody.password,
        userData.password,
      );

      return isPasswordIsValid ? userData : null;
    } catch (error) {
      return null;
    }
  }
}
