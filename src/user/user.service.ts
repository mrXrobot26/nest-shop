import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = this.userRepo.create(createUserDto);
    createdUser.password = await hash(createdUser.password, 10);
    await this.userRepo.save(createdUser);
    return createdUser;
  }

  async getAllUser() {
    const users = await this.userRepo.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: number, updatedUser: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, updatedUser);
    return await this.userRepo.save(user);
  }

  async deleteUser(id: number) {
    const result = await this.userRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: `User with ID ${id} deleted successfully` };
  }

  async findUserByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }
}
