import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Comment } from '../entities/comments';
import { CommentRepository } from '../repositories/comments-repository';

export interface IUpdateComment {
  userId: number;
  postId: number;
  description: string;
  isDeleted?: boolean;
}

@Injectable()
export class UpdateComment {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(
    id: number,
    { userId, postId, description, isDeleted }: IUpdateComment,
  ) {
    const existingComment = await this.commentRepository.findOne({ id });

    if (!existingComment) {
      throw new NotFoundException('Comment not found');
    }

    if (existingComment.userId === userId) {
      throw new ForbiddenException('You are not allowed to edit this comment');
    }

    const updatedComment = new Comment(
      {
        userId,
        postId,
        description,
        isDeleted,
      },
      id,
    );

    return {
      comment: await this.commentRepository.update(id, updatedComment),
    };
  }
}
