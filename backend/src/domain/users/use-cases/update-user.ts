import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repositories';
import { IUpdateUser } from './interface/update-interface';
import { User } from '../entities/user';
import ErrorHttp from '@helpers/Errorhttp';
import { hashSync } from 'bcrypt';

@Injectable()
export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number, { name, email, password }: IUpdateUser) {
    const checkUser = await this.userRepository.findOne({ id });

    if (!checkUser) {
      throw ErrorHttp(404, 'Not found');
    }

    const encryptPassword = password
      ? hashSync(password, 10)
      : checkUser.password;

    const updatedUser = new User(
      {
        name,
        email,
        password: encryptPassword,
      },
      id,
    );

    return {
      user: await this.userRepository.update(id, updatedUser),
    };
  }
}
