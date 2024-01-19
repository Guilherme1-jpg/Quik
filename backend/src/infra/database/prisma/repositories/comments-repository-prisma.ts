import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Comment } from '@domain/comments/entities/comments';
import { CommentRepository } from '@domain/comments/repositories/comments-repository';
import { CommentsMapperPrisma } from '../mappers/comments-mapper-prisma';

@Injectable()
export class CommentRepositoryPrisma implements CommentRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(args: object): Promise<Comment> {
    try {
      if (args.hasOwnProperty('id')) {
        args['id'] = parseInt(args['id'] as string, 10);
      }
      const comment = await this.prisma.comment.findFirstOrThrow({
        where: args,
      });
      return comment as Comment;
    } catch (error) {
      console.error('Error in comment', error);
      return null;
    }
  }
  async findAll(): Promise<Comment[]> {
    const rawComments = await this.prisma.comment.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        post: {
          select: {
            title: true,
          },
        },
      },
    });

    return rawComments.map((rawComments) =>
      CommentsMapperPrisma.ToDomain(rawComments),
    );
  }

  async create(comment: Comment): Promise<Comment> {
    try {
      const raw = CommentsMapperPrisma.toPrisma(comment);

      if (raw.id) delete raw.id;

      const newComment = await this.prisma.comment.create({
        data: raw,
      });
      return CommentsMapperPrisma.ToDomain(newComment);
    } catch (error) {
      throw new Error('Error while creating comments');
    }
  }

  async update(id: number, post: Comment): Promise<Comment> {
    try {
      if (isNaN(id)) {
        throw new Error('Invalid post ID');
      }
      const raw = CommentsMapperPrisma.toPrisma(post);
      delete raw.id;

      const commentId = Number(id);
      const commentUpdate = await this.prisma.comment.update({
        where: {
          id: commentId,
        },
        data: raw,
      });
      return CommentsMapperPrisma.ToDomain(commentUpdate);
    } catch (error) {
      throw new Error('Error updating comment');
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      if (isNaN(id)) {
        throw new Error('Invalid comment ID');
      }
      const commentId = Number(id);
      await this.prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
      return true;
    } catch (error) {
      console.error('Error while deleting comment:', error);
      throw new Error('Error while deleting comment');
    }
  }
}
