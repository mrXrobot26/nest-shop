import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Serialize } from 'src/common/Decorators/Serialize.decorator';
import { getUserDto } from './dto/get-user.dto copy';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Serialize(getUserDto)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Get()
  @Serialize(getUserDto)
  async getAllUser() {
    const users = await this.userService.getAllUser();
    return users;
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
