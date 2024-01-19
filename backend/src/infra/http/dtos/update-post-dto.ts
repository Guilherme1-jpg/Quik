import {
  IsInt,
  IsString,
  IsOptional,
  IsDate,
  IsUrl,
  IsNumber,
  Min,
} from 'class-validator';

export class PostBodyUpdate {
  @IsOptional()
  @IsInt()
  userId: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  views?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  likes?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  dislikes?: number;

  @IsOptional()
  @IsDate()
  editedAt?: Date;
}
