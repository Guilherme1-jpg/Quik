import { IsInt, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CommentBodyUpdate {
  @IsOptional()
  @IsInt()
  userId: number;

  @IsOptional()
  @IsInt()
  postId: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;
}
