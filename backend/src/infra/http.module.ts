import { Module } from '@nestjs/common';
import { Database } from './database/database.module';
import { UserController } from './http/controllers/user-controller';
import { CreateUser } from '@domain/users/use-cases/create-user';
import { UpdateUser } from '@domain/users/use-cases/update-user';
import { RemoverUser } from '@domain/users/use-cases/remove-user';
import { FindOne } from '@domain/users/use-cases/find-one';
import { AuthController } from '@auth/controllers/auth.controller';
import { JwtGuard } from '@auth/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '@auth/passportEstrategy/local.passport';
import { ConfigModule } from '@nestjs/config';
import { Auth } from '@auth/service/auth';
import { PassportModule } from '@nestjs/passport';
import { JwtPassport } from '@auth/passportEstrategy/jwt.passport';
import { PostsController } from './http/controllers/post-controller';
import { CreatePost } from '@domain/posts/use-cases/create-post';
import { UpdatePost } from '@domain/posts/use-cases/update-post';
import { RemovePost } from '@domain/posts/use-cases/remove-post';
import { FindAllPosts } from '@domain/posts/use-cases/find-all-posts';
import { CommentController } from './http/controllers/comment-controller';
import { CreateComment } from '@domain/comments/use-cases/create-comment';
import { FindAllComment } from '@domain/comments/use-cases/find-all-comment';
import { UpdateComment } from '@domain/comments/use-cases/update-comment';
import { RemoveComment } from '@domain/comments/use-cases/remove-comments';
import { FindOneComment } from '@domain/comments/use-cases/find-one-comment';
import { GetAllCommentsWithPosts } from '@domain/posts/use-cases/get-all-comments-with-posts';

@Module({
  imports: [
    Database,
    ConfigModule.forRoot(),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [
    UserController,
    AuthController,
    PostsController,
    CommentController,
  ],
  providers: [
    JwtPassport,
    JwtGuard,
    CreateUser,
    UpdateUser,
    RemoverUser,
    FindOne,
    CreatePost,
    UpdatePost,
    RemovePost,
    FindAllPosts,
    FindOneComment,
    GetAllCommentsWithPosts,
    CreateComment,
    FindAllComment,
    UpdateComment,
    RemoveComment,
    LocalStrategy,
    Auth,
  ],
})
export class HttpModule {}
