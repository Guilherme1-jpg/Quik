import { Injectable } from '@nestjs/common';
import { Comment } from '../entities/comments';
import { CommentRepository } from '../repositories/comments-repository';

export interface IfindAllComment {
  comments: Comment[];
}

@Injectable()
export class FindAllComment {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(): Promise<IfindAllComment> {
    const comments = await this.commentRepository.findAll();

    return { comments };
  }
}
