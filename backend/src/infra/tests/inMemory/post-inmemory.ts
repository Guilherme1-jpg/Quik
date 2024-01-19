import { Posts } from '@domain/posts/entities/post';
import { PostRepository } from '@domain/posts/repositories/post-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryPostRepository implements PostRepository {
  private posts: Posts[] = [];

  async create(post: Posts): Promise<Posts> {
    this.posts.push(post);
    return post;
  }

  async findAll(): Promise<Posts[]> {
    return this.posts;
  }

  async findAllWithComments(): Promise<Posts[]> {
    return this.posts;
  }

  async remove(id: number): Promise<boolean> {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter((post) => post.id !== id);
    return this.posts.length < initialLength;
  }

  async update(id: number, updatedPost: Posts): Promise<Posts> {
    const existingPost = this.posts.find((post) => post.id === id);

    if (!existingPost) {
      throw new Error('Post not found');
    }

    Object.assign(existingPost, updatedPost);

    return existingPost;
  }
}
