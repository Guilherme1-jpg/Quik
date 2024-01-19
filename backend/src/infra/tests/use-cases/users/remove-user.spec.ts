import { User } from '@domain/users/entities/user';
import { RemoverUser } from '@domain/users/use-cases/remove-user';
import { InMemoryUserRepository } from '@infra/tests/inMemory/user-inmemory';

describe('RemoverUser', () => {
  let removerUser: RemoverUser;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    removerUser = new RemoverUser(userRepository);
  });

  it('should remove an existing user', async () => {
    const existingUserData = {
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'existingPassword',
    };

    const existingUser = await userRepository.create(
      new User(existingUserData),
    );

    const result = await removerUser.execute(existingUser.id);

    expect(result).toBeTruthy();

    const removedUser = await userRepository.findOne({ id: existingUser.id });
    expect(removedUser).toBeNull();
  });

  it('should return false if user to remove is not found', async () => {
    const nonExistingUserId = 300;

    const result = await removerUser.execute(nonExistingUserId);

    expect(result).toBeFalsy();
  });
});
