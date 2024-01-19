import { User } from '@domain/users/entities/user';
import { UserRepository } from '@domain/users/repositories/user-repositories';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserMapperPrisma } from '../mappers/user-mapper-prisma';
@Injectable()
export class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(args: object): Promise<User | null> {
    try {
      if (args.hasOwnProperty('id')) {
        args['id'] = parseInt(args['id'] as string, 10);
      }
      const users = await this.prisma.user.findFirstOrThrow({
        where: args,
      });
      return users as User;
    } catch (error) {
      console.error('Error in UserRepositoryPrisma.findOne:', error);
      return null;
    }
  }

  async create(user: User): Promise<User> {
    try {
      const raw = UserMapperPrisma.toPrisma(user);
      if (!raw.id) delete raw.id;

      const newUser = await this.prisma.user.create({
        data: {
          ...raw,
        },
      });

      return UserMapperPrisma.ToDomain(newUser);
    } catch (error) {
      throw new Error('While create user error, please contact us');
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      if (isNaN(id)) {
        throw new Error('Invalid user ID');
      }
      const userId = Number(id);
      await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.error('Error while deleting user:', error);
      throw new Error('Error while deleting user');
    }
  }

  async update(id: number, user: User): Promise<User> {
    try {
      if (isNaN(id)) {
        throw new Error('Invalid user ID');
      }
      const raw = UserMapperPrisma.toPrisma(user);
      delete raw.id;

      const userId = Number(id);
      const userUpdate = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: raw,
      });
      return UserMapperPrisma.ToDomain(userUpdate);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Error updating user');
    }
  }
}
