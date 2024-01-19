import * as gracefulFs from 'graceful-fs';
import path, { join } from 'path';
import { UpdatePost, IUpdatePost } from '@domain/posts/use-cases/update-post';
import { InMemoryPostRepository } from '@infra/tests/inMemory/post-inmemory';
import { Posts } from '@domain/posts/entities/post';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = gracefulFs.gracefulify(require('fs'));

describe('UpdatePost', () => {
  let updatePost: UpdatePost;
  let postRepository: InMemoryPostRepository;

  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    updatePost = new UpdatePost(postRepository);
  });

  it('should update an existing post', async () => {
    const existingPostId = 1;
    const existingPostData = {
      userId: 1,
      title: 'Title for test',
      description: 'post for test',
      image: 'image',
      views: 10,
      likes: 5,
      dislikes: 1,
    };

    const existingPost = await postRepository.create(
      new Posts(existingPostData, existingPostId),
    );

    const newImageFilePath = join(__dirname, 'upload', 'avatarTeste2.jpg');
    const newImageBuffer = fs.readFileSync(newImageFilePath);

    const updatedPostData: IUpdatePost = {
      userId: 2,
      title: 'Updated Post',
      description: 'This is an updated post',
      image: newImageBuffer.toString('base64'),
      views: 20,
      likes: 10,
      dislikes: 2,
    };

    const result = await updatePost.execute(existingPostId, updatedPostData);

    expect(result).toBeDefined();
    expect(result.posts).toBeDefined();
    expect(result.posts.id).toBe(existingPostId);
    expect(result.posts.userId).toBe(updatedPostData.userId);
    expect(result.posts.title).toBe(updatedPostData.title);
    expect(result.posts.description).toBe(updatedPostData.description);
    expect(result.posts.image).toBe(updatedPostData.image);
    expect(result.posts.views).toBe(updatedPostData.views);
    expect(result.posts.likes).toBe(updatedPostData.likes);
    expect(result.posts.dislikes).toBe(updatedPostData.dislikes);
  });
});
