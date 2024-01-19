import { Module } from '@nestjs/common';
import { UserRepositoryPrisma } from './prisma/repositories/user-repository-prisma';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '@domain/users/repositories/user-repositories';
import { PostRepository } from '@domain/posts/repositories/post-repository';
import { PostRepositoryPrisma } from './prisma/repositories/posts-repository-prisma';
import { CommentRepository } from '@domain/comments/repositories/comments-repository';
import { CommentRepositoryPrisma } from './prisma/repositories/comments-repository-prisma';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserRepositoryPrisma,
    },
    {
      provide: PostRepository,
      useClass: PostRepositoryPrisma,
    },
    {
      provide: CommentRepository,
      useClass: CommentRepositoryPrisma,
    },
  ],
  exports: [UserRepository, PostRepository, CommentRepository],
})
export class Database {}
