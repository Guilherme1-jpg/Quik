import { User } from '@domain/users/entities/user';

export class UserModel {
  static toHttp(user: User) {
    return {
      email: user.email,
      id: user.id,
      name: user.name,
    };
  }
}
