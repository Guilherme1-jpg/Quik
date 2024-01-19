import { Injectable } from '@nestjs/common';
import { Posts } from '../entities/post';
import { PostRepository } from '../repositories/post-repository';

export interface IUpdatePost {
  userId: number;
  title: string;
  description: string;
  image?: string;
  views?: number;
  likes?: number;
  dislikes?: number;
}

@Injectable()
export class UpdatePost {
  constructor(private readonly postsRepository: PostRepository) {}

  async execute(
    id: number,
    { userId, title, description, image, views, likes, dislikes }: IUpdatePost,
  ) {
    const updatedPost = new Posts(
      {
        userId,
        title,
        description,
        image,
        views,
        likes,
        dislikes,
      },
      id,
    );

    return {
      posts: await this.postsRepository.update(id, updatedPost),
    };
  }
}
