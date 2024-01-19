import { User } from '@domain/users/entities/user';
import { UpdateUser } from '@domain/users/use-cases/update-user';
import { InMemoryUserRepository } from '@infra/tests/inMemory/user-inmemory';
import { IUpdateUser } from '../../../../domain/users/use-cases/interface/update-interface';

describe('UpdateUser', () => {
  let updateUser: UpdateUser;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    updateUser = new UpdateUser(userRepository);
  });

  it('should update an existing user', async () => {
    const existingUserData = {
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'existingPassword',
    };
    const existingUser = await userRepository.create(
      new User(existingUserData),
    );
    const updatedUserData: IUpdateUser = {
      name: 'Updated User',
      email: 'updated@example.com',
      password: 'updatedPassword',
    };
    const result = await updateUser.execute(existingUser.id, updatedUserData);
    expect(result).toBeDefined();
    expect(result.user).toBeDefined();
    expect(result.user.id).toBe(existingUser.id);
    expect(result.user.name).toBe(updatedUserData.name);
    expect(result.user.email).toBe(updatedUserData.email);
  });

  it('should throw an error if user to update is not found', async () => {
    const nonExistingUserId = 300;

    const updatedUserData: IUpdateUser = {
      name: 'Updated User',
      email: 'updated@example.com',
      password: 'updatedPassword',
    };

    await expect(
      updateUser.execute(nonExistingUserId, updatedUserData),
    ).rejects.toThrowError('Not found');
  });
});
