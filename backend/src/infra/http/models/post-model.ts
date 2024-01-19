import { Posts } from '@domain/posts/entities/post';

export class PostModel {
  static toHttp(post: Posts) {
    return {
      id: post.id,
      userId: post.userId,
      title: post.title,
      description: post.description,
      image: post.image,
      views: post.views,
      likes: post.likes,
      dislikes: post.dislikes,
      editedAt: post.editedAt,
    };
  }
}
