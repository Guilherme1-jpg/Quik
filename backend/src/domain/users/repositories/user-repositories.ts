import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findOne(args: object): Promise<User | null>;
  abstract remove(id: number): Promise<boolean>;
  abstract update(id: number, user: User): Promise<User>;
}
