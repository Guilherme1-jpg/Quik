import { Injectable } from '@nestjs/common';
import { Posts } from '../entities/post';
import { PostRepository } from '../repositories/post-repository';

export interface IfindAllPosts {
  posts: Posts[];
}

@Injectable()
export class FindAllPosts {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(): Promise<IfindAllPosts> {
    const posts = await this.postRepository.findAll();

    return { posts };
  }
}
