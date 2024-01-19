import { Injectable } from '@nestjs/common';
import { Comment } from '../entities/comments';
import { CommentRepository } from '../repositories/comments-repository';

export interface ICreateComment {
  userId: number;
  postId: number;
  description: string;
  isDeleted?: boolean;
}

@Injectable()
export class CreateComment {
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute({
    userId,
    postId,
    description,
    isDeleted,
  }: ICreateComment): Promise<Comment> {
    const newComment = new Comment({
      userId,
      postId,
      description,
      isDeleted,
    });

    return await this.commentRepository.create(newComment);
  }
}
