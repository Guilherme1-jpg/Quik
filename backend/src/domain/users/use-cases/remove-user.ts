import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repositories';

@Injectable()
export class RemoverUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.userRepository.remove(id);
  }
}
