import { Posts } from '../entities/post';

export abstract class PostRepository {
  abstract create(post: Posts): Promise<Posts>;
  abstract findAll(): Promise<Posts[]>;
  abstract findAllWithComments(): Promise<Posts[]>;
  abstract remove(id: number): Promise<boolean>;
  abstract update(id: number, post: Posts): Promise<Posts>;
}
