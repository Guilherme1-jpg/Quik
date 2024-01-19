import { Injectable } from '@nestjs/common';
import { Comment } from '../entities/comments';
import { CommentRepository } from '../repositories/comments-repository';

@Injectable()
export class FindOneComment {
  constructor(private commentRepository: CommentRepository) {}

  async execute(args: object): Promise<Comment | null> {
    return await this.commentRepository.findOne(args);
  }
}
