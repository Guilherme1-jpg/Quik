import { JwtGuard } from '@auth/jwt.guard';
import { CreateUser } from '@domain/users/use-cases/create-user';
import { FindOne } from '@domain/users/use-cases/find-one';
import { RemoverUser } from '@domain/users/use-cases/remove-user';
import { UpdateUser } from '@domain/users/use-cases/update-user';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserBodyCreate } from '../dtos/create-user-dto';
import { UserModel } from '../models/user-model';
import { UserBodyUpdate } from '../dtos/update-user-dto';

@Controller('user')
export class UserController {
  constructor(
    private createUser: CreateUser,
    private findOne: FindOne,
    private updateUser: UpdateUser,
    private removeUser: RemoverUser,
  ) {}

  @Post('new')
  async create(@Body() body: UserBodyCreate) {
    const { name, email, password } = body;
    const response = await this.createUser.execute({
      name,
      email,
      password,
    });

    if (!response) {
      return response;
    }

    return { user: UserModel.toHttp(response.user) };
  }

  @Get('search/:idOrEmail')
  @UseGuards(JwtGuard)
  async search(@Param('idOrEmail') idOrEmail: string) {
    try {
      const isEmail = idOrEmail.includes('@');
      const args = isEmail ? { email: idOrEmail } : { id: idOrEmail };

      const response = await this.findOne.execute(args);

      if (!response) {
        return { user: null };
      }

      return { user: response };
    } catch (error) {
      return { user: null };
    }
  }

  @Delete('delete/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id') id: number) {
    return await this.removeUser.execute(id);
  }

  @Put('update/:id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id: number, @Body() body: UserBodyUpdate) {
    const { name, email, password } = body;

    const { user } = await this.updateUser.execute(id, {
      name,
      email,
      password,
    });

    return { user: UserModel.toHttp(user) };
  }
}
