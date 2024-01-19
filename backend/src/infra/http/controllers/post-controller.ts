import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from '@auth/jwt.guard';
import { PostModel } from '../models/post-model';
import { CreatePost, ICreatePost } from '@domain/posts/use-cases/create-post';
import { RemovePost } from '@domain/posts/use-cases/remove-post';
import { UpdatePost, IUpdatePost } from '@domain/posts/use-cases/update-post';
import {
  FindAllPosts,
  IfindAllPosts,
} from '@domain/posts/use-cases/find-all-posts';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetAllCommentsWithPosts } from '@domain/posts/use-cases/get-all-comments-with-posts';
import { Posts } from '@domain/posts/entities/post';

@Controller('posts')
export class PostsController {
  constructor(
    private createPostService: CreatePost,
    private findAllPostsService: FindAllPosts,
    private removePostService: RemovePost,
    private updatePostService: UpdatePost,
    private getAllCommentsWithPost: GetAllCommentsWithPosts,
  ) {}

  @Get('report')
  async generateReport(): Promise<Posts[]> {
    return await this.getAllCommentsWithPost.execute();
  }

  @Post('new')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: ICreatePost,
  ) {
    const response = await this.createPostService.execute({
      ...body,
      image: file,
    });

    if (!response) {
      return response;
    }

    return { post: PostModel.toHttp(response) };
  }

  @Get('all')
  @UseGuards(JwtGuard)
  async findAll(): Promise<IfindAllPosts> {
    const response = await this.findAllPostsService.execute();

    return response;
  }

  @Delete('/delete/:id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: number) {
    return await this.removePostService.execute(id);
  }

  @Put('/update/:id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id: number, @Body() body: IUpdatePost) {
    const response = await this.updatePostService.execute(id, body);

    return { post: PostModel.toHttp(response.posts) };
  }
}
