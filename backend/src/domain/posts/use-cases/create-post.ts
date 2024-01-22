import { Injectable } from '@nestjs/common';
import { Posts } from '../entities/post';
import { PostRepository } from '../repositories/post-repository';

export interface ICreatePost {
  userId: number | string;
  title: string;
  description: string;
  image?: Express.Multer.File;
  views?: number;
  likes?: number;
  dislikes?: number;
}

@Injectable()
export class CreatePost {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({
    userId,
    title,
    description,
    image,
    views,
    likes,
    dislikes,
  }: ICreatePost): Promise<Posts> {
    try {
      const numericUserId =
        typeof userId === 'number' ? userId : parseInt(userId, 10);

      let base64Image: string | undefined;

      if (image) {
        base64Image = image.buffer.toString('base64');
      }

      const newPost = new Posts({
        userId: numericUserId,
        title,
        description,
        image: base64Image,
        views,
        likes,
        dislikes,
      });

      return await this.postRepository.create(newPost);
    } catch (error) {
      console.error('Error while creating posts:', error);
      throw new Error('Error while creating posts');
    }
  }
}
