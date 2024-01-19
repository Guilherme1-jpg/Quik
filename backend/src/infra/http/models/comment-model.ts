import { Comment } from '@domain/comments/entities/comments';

export class CommentModel {
  static toHttp(comment: Comment) {
    return {
      id: comment.id,
      userId: comment.userId,
      postId: comment.postId,
      description: comment.description,
      isDeleted: comment.isDeleted,
    };
  }
}
