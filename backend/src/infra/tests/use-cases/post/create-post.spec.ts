import { CreatePost, ICreatePost } from '@domain/posts/use-cases/create-post';
import { InMemoryPostRepository } from '@infra/tests/inMemory/post-inmemory';
import { join } from 'path';
import * as gracefulFs from 'graceful-fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = gracefulFs.gracefulify(require('fs'));

describe('CreatePost', () => {
  let createPost: CreatePost;
  let postRepository: InMemoryPostRepository;

  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    createPost = new CreatePost(postRepository);
  });

  it('should create a new post with an image', async () => {
    const imageFilePath = join(__dirname, 'upload', 'avatarTeste.jpg');

    const imageBuffer = fs.readFileSync(imageFilePath);

    const postData: ICreatePost = {
      userId: 1,
      title: 'Test Post',
      description: 'This is a test post',
      image: {
        buffer: imageBuffer,
        mimetype: 'image/jpeg',
        size: imageBuffer.length,
        fieldname: 'image',
        originalname: 'avatarTeste.jpg',
        encoding: '7bit',
        destination: '/uploads',
        filename: 'avatarTeste.jpg',
        path: imageFilePath,
        stream: fs.createReadStream(imageFilePath),
      },
      views: 0,
      likes: 0,
      dislikes: 0,
    };

    const result = await createPost.execute(postData);

    expect(result).toBeDefined();
    expect(result.userId).toBe(postData.userId);
    expect(result.title).toBe(postData.title);
    expect(result.description).toBe(postData.description);
    expect(result.image).toBeDefined();
    expect(result.views).toBe(postData.views);
    expect(result.likes).toBe(postData.likes);
    expect(result.dislikes).toBe(postData.dislikes);
  });
});
