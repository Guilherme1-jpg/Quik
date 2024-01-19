import { CreateComment } from '@domain/comments/use-cases/create-comment';
import { InMemoryCommentRepository } from '@infra/tests/inMemory/comment-inMemory';

describe('CreateComment', () => {
  let createComment: CreateComment;
  let commentRepository: InMemoryCommentRepository;

  beforeEach(() => {
    commentRepository = new InMemoryCommentRepository();
    createComment = new CreateComment(commentRepository);
  });

  it('should create a new comment', async () => {
    const existingUserId = 1;
    const existingPostId = 1;

    const newCommentData = {
      userId: existingUserId,
      postId: existingPostId,
      description: 'This is a new comment',
      isDeleted: false,
    };

    const result = await createComment.execute(newCommentData);

    expect(result).toBeDefined();
    expect(result.userId).toBe(newCommentData.userId);
    expect(result.postId).toBe(newCommentData.postId);
    expect(result.description).toBe(newCommentData.description);
    expect(result.isDeleted).toBe(newCommentData.isDeleted);
  });
});
