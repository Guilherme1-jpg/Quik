import { User } from '@domain/users/entities/user';
import { UserRepository } from '@domain/users/repositories/user-repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private user: User[] = [];

  async findOne(args: object): Promise<User | null> {
    const foundUser = this.user.find((user) => {
      for (const key in args) {
        if (user[key] !== args[key]) {
          return false;
        }
      }
      return true;
    });

    return foundUser || null;
  }

  async create(user: User): Promise<User> {
    this.user.push(user);

    return user;
  }

  async remove(id: number): Promise<boolean> {
    const initialLength = this.user.length;
    this.user = this.user.filter((user) => user.id !== id);
    return this.user.length < initialLength;
  }

  async update(id: number, user: User): Promise<User> {
    const existingUser = this.user.find((o) => o.id === id);

    if (!existingUser) {
      throw new Error('User not found');
    }

    existingUser.email = user.email;
    existingUser.name = user.name;
    existingUser.password;

    return existingUser;
  }
}
