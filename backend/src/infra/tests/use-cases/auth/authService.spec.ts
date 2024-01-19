import { JwtService } from '@nestjs/jwt';
import { InMemoryUserRepository } from '@infra/tests/inMemory/user-inmemory';
import { Auth } from '@auth/service/auth';
import { UnauthorizedException } from '@nestjs/common';
import { LocalStrategy } from '@auth/passportEstrategy/local.passport';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    const realJwt = new JwtService();
    const authService = new Auth(userRepository, realJwt);
    localStrategy = new LocalStrategy(authService);
  });

  describe('validate', () => {
    it('should throw UnauthorizedException if user is not found', async () => {
      const nonExistentUser = {
        email: 'admin@example.com',
        password: 'password',
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(
        localStrategy.validate({ body: nonExistentUser }),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user credentials are invalid', async () => {
      const invalidCredentials = {
        email: 'test@example.com',
        password: 'invalidPassword',
      };

      await expect(
        localStrategy.validate({ body: invalidCredentials }),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const nonExistentUser = {
        email: 'nonexistent@example.com',
        password: 'password',
      };

      await expect(
        localStrategy.validate({ body: nonExistentUser }),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });
});
