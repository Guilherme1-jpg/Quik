import { Comment } from '@domain/comments/entities/comments';
import { UpdateComment } from '@domain/comments/use-cases/update-comment';
import { InMemoryCommentRepository } from '@infra/tests/inMemory/comment-inMemory';
import { ForbiddenException } from '@nestjs/common';

describe('UpdateComment', () => {
  let updateComment: UpdateComment;
  let commentRepository: InMemoryCommentRepository;

  beforeEach(() => {
    commentRepository = new InMemoryCommentRepository();
    updateComment = new UpdateComment(commentRepository);
  });

  it('should throw ForbiddenException if the user is not allowed to edit the comment', async () => {
    const user1Id = 1;
    const user2Id = 2;

    const initialCommentData = {
      userId: user1Id,
      postId: 1,
      description: 'Initial comment',
      isDeleted: false,
    };
    const initialComment = await commentRepository.create(
      new Comment(initialCommentData),
    );
    const updatedCommentData = {
      userId: user2Id,
      postId: 1,
      description: 'Updated comment',
      isDeleted: true,
    };
    const updateFunction = async () => {
      try {
        await updateComment.execute(initialComment.id, updatedCommentData);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ForbiddenException);
        expect(error.message).toBe('You are not allowed to edit this comment');
      }
    };
    await updateFunction();
  });

  it('should throw NotFoundException for updating a non-existing comment', async () => {
    const nonExistingCommentId = 100;

    const updatedCommentData = {
      userId: 1,
      postId: 1,
      description: 'Updated comment',
      isDeleted: true,
    };

    await expect(
      updateComment.execute(nonExistingCommentId, updatedCommentData),
    ).rejects.toThrowError('Comment not found');
  });

  it('should throw NotFoundException for updating a non-existing comment', async () => {
    const nonExistingCommentId = 100;

    const updatedCommentData = {
      userId: 1,
      postId: 1,
      description: 'Updated comment',
      isDeleted: true,
    };

    await expect(
      updateComment.execute(nonExistingCommentId, updatedCommentData),
    ).rejects.toThrowError('Comment not found');
  });
});
