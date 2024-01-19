import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post-repository';

@Injectable()
export class RemovePost {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.postRepository.remove(id);
  }
}
