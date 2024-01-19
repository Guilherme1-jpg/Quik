import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repositories';
import { User } from '../entities/user';

@Injectable()
export class FindOne {
  constructor(private userRepository: UserRepository) {}

  async execute(args: object): Promise<User | null> {
    return await this.userRepository.findOne(args);
  }
}
