import { Comment } from '@domain/comments/entities/comments';
import { Comment as RawComment } from '@prisma/client';

export class CommentsMapperPrisma {
  static toPrisma(comment: Comment): RawComment {
    return {
      description: comment.description,
      isDeleted: comment.isDeleted,
      postId: comment.postId,
      userId: comment.userId,
      id: comment.id ? Number(comment.id) : null,
    };
  }

  static ToDomain(raw: RawComment): Comment {
    return new Comment(
      {
        description: raw.description,
        isDeleted: raw.isDeleted,
        postId: raw.postId,
        userId: raw.userId,
      },
      Number(raw.id),
    );
  }
}
