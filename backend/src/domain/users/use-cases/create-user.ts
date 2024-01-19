import { hashSync } from 'bcrypt';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user-repositories';
import { Injectable } from '@nestjs/common';
import ErrorHttp from '@helpers/Errorhttp';

export interface newUserCreate {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: newUserCreate) {
    const checkingUser = await this.userRepository.findOne({ email });

    if (checkingUser) {
      throw ErrorHttp(409, 'User with this email already exists');
    }

    const encryptPassword = hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: encryptPassword,
    });

    const response = await this.userRepository.create(newUser);

    if (response) {
      return { user: newUser };
    }

    return null;
  }
}
