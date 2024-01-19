import { Posts } from '@domain/posts/entities/post';
import { PostRepository } from '@domain/posts/repositories/post-repository';
import { Injectable } from '@nestjs/common';
import { PostsMapperPrisma } from '../mappers/posts-mapper-prisma';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostRepositoryPrisma implements PostRepository {
  constructor(private prisma: PrismaService) {}

  async findAllWithComments(): Promise<Posts[]> {
    const postsWithCommentCount = await this.prisma.post.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return postsWithCommentCount.map((rawPost) => {
      const post = PostsMapperPrisma.ToDomain(rawPost);
      post.commentsCount = rawPost.comments.length;
      post.comments = rawPost.comments.map((rawComment) => ({
        id: rawComment.id,
        userId: rawComment.userId,
        description: rawComment.description,
        user: {
          id: rawComment.user.id,
          name: rawComment.user.name,
        },
      })) as unknown as Comment[];
      return post;
    });
  }

  async findAll(): Promise<Posts[]> {
    const rawPosts = await this.prisma.post.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        comments: {
          select: {
            description: true,
          },
        },
      },
    });

    return rawPosts.map((rawPosts) => PostsMapperPrisma.ToDomain(rawPosts));
  }

  async create(post: Posts): Promise<Posts> {
    try {
      const raw = PostsMapperPrisma.toPrisma(post);
      if (!raw.id) delete raw.id;

      console.log('Raw post data:', raw);
      const newPost = await this.prisma.post.create({
        data: raw,
      });
      console.log('New post from Prisma:', newPost);
      return PostsMapperPrisma.ToDomain(newPost);
    } catch (error) {
      console.error('Error while creating posts:', error);
      throw new Error('Error while creating posts');
    }
  }

  async update(id: number, post: Posts): Promise<Posts> {
    try {
      if (isNaN(id)) {
        throw new Error('Invalid post ID');
      }
      const raw = PostsMapperPrisma.toPrisma(post);
      delete raw.id;

      const postId = Number(id);
      const postUpdate = await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: raw,
      });
      return PostsMapperPrisma.ToDomain(postUpdate);
    } catch (error) {
      throw new Error('Error updating post');
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      if (isNaN(id)) {
        throw new Error('Invalid post ID');
      }
      const postId = Number(id);

      await this.prisma.comment.deleteMany({
        where: {
          postId: postId,
        },
      });

      await this.prisma.post.delete({
        where: {
          id: postId,
        },
      });
      return true;
    } catch (error) {
      console.error('Error while deleting user:', error);
      throw new Error('Error while deleting user');
    }
  }
}
