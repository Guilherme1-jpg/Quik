import { Comment } from '../entities/comments';

export abstract class CommentRepository {
  abstract create(comment: Comment): Promise<Comment>;
  abstract findAll(): Promise<Comment[]>;
  abstract remove(id: number): Promise<boolean>;
  abstract update(id: number, comment: Comment): Promise<Comment>;
  abstract findOne(args: object): Promise<Comment | null>;
}
