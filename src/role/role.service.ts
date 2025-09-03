import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/createRole.dto';
import { UpdateRoleDto } from './dto/UpdateRole.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private userService: UserService,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create(createRoleDto);
      return await this.roleRepository.save(role);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Role name already exists');
      }
      throw new InternalServerErrorException('Failed to create role');
    }
  }

  async getAllRoles(status: boolean) {
    return await this.roleRepository.find({ where: { isActive: status }, relations: ['users'] });
  }

  async getRoleById(id: number, status: boolean) {
    const role = await this.roleRepository.findOne({
      where: { id, isActive: status },
      relations: ['users'],
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    Object.assign(role, updateRoleDto);
    return await this.roleRepository.save(role);
  }

  async assignRoleToUser(userId: number, roleId: number) {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['users'],
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    //check if user already has the role
    const hasRole = role.users.some(u => u.id === userId);
    if (hasRole) {
      throw new ConflictException('User already has this role');
    }
    role.users.push(user);
    await this.roleRepository.save(role);

    return {
      message: `Role ${role.name} assigned to user successfully`,
      role: {
        id: role.id,
        name: role.name,
      },
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async deleteRoleFromUser(userId: number, roleId: number) {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['users'],
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hasRole = role.users.some(u => u.id === userId);
    if (!hasRole) {
      throw new ConflictException('User does not have this role');
    }
    role.users = role.users.filter(u => u.id !== userId);

    await this.roleRepository.save(role);

    return {
      message: `Role ${role.name} removed from user successfully`,
      role: {
        id: role.id,
        name: role.name,
      },
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
