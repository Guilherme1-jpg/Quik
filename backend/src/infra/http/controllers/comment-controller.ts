import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '@auth/jwt.guard';
import { CommentModel } from '../models/comment-model';
import { CreateComment } from '@domain/comments/use-cases/create-comment';
import { RemoveComment } from '@domain/comments/use-cases/remove-comments';
import { UpdateComment } from '@domain/comments/use-cases/update-comment';
import {
  FindAllComment,
  IfindAllComment,
} from '@domain/comments/use-cases/find-all-comment';
import { CommentBodyCreate } from '../dtos/create-comment-dto';
import { CommentBodyUpdate } from '../dtos/update-comment-dto';
import { FindOneComment } from '@domain/comments/use-cases/find-one-comment';

@Controller('comments')
export class CommentController {
  constructor(
    private createCommentService: CreateComment,
    private findAllCommentService: FindAllComment,
    private removeCommentService: RemoveComment,
    private updateCommentService: UpdateComment,
    private findOneComment: FindOneComment,
  ) {}

  @Get('search/:idOrEmail')
  @UseGuards(JwtGuard)
  async search(@Param('idOrEmail') idOrEmail: string) {
    try {
      const isEmail = idOrEmail.includes('@');
      const args = isEmail ? { email: idOrEmail } : { id: idOrEmail };

      const response = await this.findOneComment.execute(args);

      if (!response) {
        return { comment: null };
      }

      return { comment: response };
    } catch (error) {
      return { comment: null };
    }
  }

  @Post('new')
  @UseGuards(JwtGuard)
  async create(@Body() body: CommentBodyCreate) {
    const response = await this.createCommentService.execute({
      ...body,
    });

    if (!response) {
      return response;
    }

    return { comment: CommentModel.toHttp(response) };
  }

  @Get('all')
  @UseGuards(JwtGuard)
  async findAll(): Promise<IfindAllComment> {
    const response = await this.findAllCommentService.execute();

    return response;
  }

  @Delete('/delete/:id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: number, @Body('userId') userId: number) {
    return await this.removeCommentService.execute(id, userId);
  }

  @Put('/update/:id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id: number, @Body() body: CommentBodyUpdate) {
    const response = await this.updateCommentService.execute(id, body);

    return { comment: CommentModel.toHttp(response.comment) };
  }
}
