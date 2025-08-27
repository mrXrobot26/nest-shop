import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = this.userRepo.create(createUserDto);
    await this.userRepo.save(createdUser);
    return createdUser;
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    return user;
  }
}
