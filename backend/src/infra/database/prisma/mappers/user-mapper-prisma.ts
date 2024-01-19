import { User } from '@domain/users/entities/user';
import { User as RawUser } from '@prisma/client';

export class UserMapperPrisma {
  static toPrisma(user: User): RawUser {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      id: user.id ? Number(user.id) : null,
    };
  }

  static ToDomain(raw: RawUser): User {
    return new User(
      {
        email: raw.email,
        password: raw.password,
        name: raw.name,
      },
      Number(raw.id),
    );
  }
}
