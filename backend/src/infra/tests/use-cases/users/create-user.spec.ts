import { User } from '@domain/users/entities/user';
import { CreateUser, newUserCreate } from '@domain/users/use-cases/create-user';
import { InMemoryUserRepository } from '@infra/tests/inMemory/user-inmemory';

describe('CreateUser', () => {
  let createUser: CreateUser;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    createUser = new CreateUser(userRepository);
  });

  it('should create a new user', async () => {
    const userData: newUserCreate = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await createUser.execute(userData);

    expect(result).toBeDefined();
    expect(result.user).toBeDefined();
    expect(result.user.name).toBe(userData.name);
    expect(result.user.email).toBe(userData.email);
    expect(result.user.password).not.toBe(userData.password);
  });

  it('should throw an error if user with the same email already exists', async () => {
    const existingUser: newUserCreate = {
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'existingPassword',
    };

    await userRepository.create(new User(existingUser));

    const userData: newUserCreate = {
      name: 'Test User',
      email: 'existing@example.com',
      password: 'password123',
    };

    await expect(createUser.execute(userData)).rejects.toThrowError(
      'User with this email already exists',
    );
  });
});
