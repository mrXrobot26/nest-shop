import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Serialize } from 'src/common/Decorators/Serialize.decorator';
import { getUserDto } from './dto/get-user.dto copy';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/common/Decorators/currentUser.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @Serialize(getUserDto)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Get('/getAll')
  @Serialize(getUserDto)
  async getAllUser() {
    const users = await this.userService.getAllUser();
    return users;
  }

  @Serialize(getUserDto)
  @Get('/me')
  async getMe(@CurrentUser() currentUser) {
    const user = await this.userService.getUserById(currentUser.sub);
    return user;
  }

  @Get('/:id')
  @Serialize(getUserDto)
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUserById(id);
    return user;
  }

  @Patch('/:id')
  @Serialize(getUserDto)
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updatedUser: UpdateUserDto) {
    const user = await this.userService.updateUser(id, updatedUser);
    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
