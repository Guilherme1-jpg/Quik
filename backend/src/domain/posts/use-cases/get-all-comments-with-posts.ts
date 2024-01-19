import { Injectable } from '@nestjs/common';
import { Posts } from '../entities/post';
import { PostRepository } from '../repositories/post-repository';

@Injectable()
export class GetAllCommentsWithPosts {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(): Promise<Posts[]> {
    return await this.postRepository.findAllWithComments();
  }
}
