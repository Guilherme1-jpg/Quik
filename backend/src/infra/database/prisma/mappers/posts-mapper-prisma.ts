import { Posts } from '@domain/posts/entities/post';
import { Post as RawPost } from '@prisma/client';

export class PostsMapperPrisma {
  static toPrisma(post: Posts): RawPost {
    return {
      description: post.description,
      dislikes: post.dislikes,
      image: post.image,
      likes: post.likes,
      title: post.title,
      userId: post.userId,
      views: post.views,
      editedAt: post.editedAt,
      id: post.id ? Number(post.id) : null,
    };
  }

  static ToDomain(raw: RawPost): Posts {
    return new Posts(
      {
        description: raw.description,
        dislikes: raw.dislikes,
        image: raw.image,
        likes: raw.likes,
        title: raw.title,
        userId: raw.userId,
        views: raw.views,
        editedAt: raw.editedAt,
      },
      Number(raw.id),
    );
  }
}
