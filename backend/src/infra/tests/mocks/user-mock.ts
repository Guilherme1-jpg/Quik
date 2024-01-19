import { User, UserProps } from '@domain/users/entities/user';
import { randomUUID } from 'crypto';

export function MockUser(
  email: string,
  password: string,
  name?: string,
  createdAt?: Date,
  updatedAt?: Date,
): User {
  const userProps: UserProps = {
    email,
    password,
    name: name || 'DefaultName',
    createdAt: createdAt || new Date(),
    updatedAt,
  };

  return new User(userProps);
}
