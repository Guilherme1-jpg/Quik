import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentRepository } from '../repositories/comments-repository';

@Injectable()
export class RemoveComment {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(id: number, userId: number): Promise<boolean> {
    const existingComment = await this.commentRepository.findOne({ id });

    if (!existingComment) {
      throw new NotFoundException('Comment not found');
    }

    if (existingComment.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to remove this comment',
      );
    }

    if (existingComment.postId && existingComment.postId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to remove this comment',
      );
    }

    return await this.commentRepository.remove(id);
  }
}
