import { Posts } from '@domain/posts/entities/post';
import { RemovePost } from '@domain/posts/use-cases/remove-post';
import { InMemoryPostRepository } from '@infra/tests/inMemory/post-inmemory';

describe('RemovePost', () => {
  let removePost: RemovePost;
  let postRepository: InMemoryPostRepository;

  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    removePost = new RemovePost(postRepository);
  });

  it('should remove an existing post', async () => {
    const existingPostId = 1;
    const existingPostData = {
      userId: 1,
      title: 'Existing Post',
      description: 'This is an existing post',
      image: 'existingImage',
      views: 10,
      likes: 5,
      dislikes: 1,
    };

    await postRepository.create(new Posts(existingPostData, existingPostId));

    const result = await removePost.execute(existingPostId);

    expect(result).toBeTruthy();
  });

  it('should return false for removing a non-existing post', async () => {
    const nonExistingPostId = 100;

    const result = await removePost.execute(nonExistingPostId);

    expect(result).toBeFalsy();
  });
});
