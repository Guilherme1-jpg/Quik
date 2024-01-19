import { Comment } from '@domain/comments/entities/comments';
import { CommentRepository } from '@domain/comments/repositories/comments-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryCommentRepository extends CommentRepository {
  private comment: Comment[] = [];

  async findOne(args: object): Promise<Comment | null> {
    const foundUser = this.comment.find((comment) => {
      for (const key in args) {
        if (comment[key] !== args[key]) {
          return false;
        }
      }
      return true;
    });

    return foundUser || null;
  }

  async create(comment: Comment): Promise<Comment> {
    this.comment.push(comment);

    return comment;
  }

  async remove(id: number): Promise<boolean> {
    const initialLength = this.comment.length;
    this.comment = this.comment.filter((comment) => comment.id !== id);
    return this.comment.length < initialLength;
  }

  async update(id: number, comment: Comment): Promise<Comment> {
    const existingComment = this.comment.find((o) => o.id === id);

    if (!existingComment) {
      throw new Error('Comment not found');
    }

    Object.assign(existingComment, comment);

    return existingComment;
  }

  async findAll(): Promise<Comment[]> {
    return this.comment;
  }
}
