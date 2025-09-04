import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { GetRoleDto } from './dto/getRole.dto';
import { Serialize } from 'src/common/Decorators/Serialize.decorator';
import { UpdateRoleDto } from './dto/UpdateRole.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.createRole(createRoleDto);
  }

  @Get('/getAll')
  @Serialize(GetRoleDto)
  async getAllRoles(@Query('status') status: string = 'true') {
    return await this.roleService.getAllRoles(status === 'true');
  }

  @Get('/:id')
  @Serialize(GetRoleDto)
  async getRoleById(
    @Param('id', ParseIntPipe) id: number,
    @Query('status') status: string = 'true',
  ) {
    return await this.roleService.getRoleById(id, status === 'true');
  }

  @Patch('/:id')
  async updateRole(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.roleService.updateRole(id, updateRoleDto);
  }

  @Post('/assignRoleToUser')
  async assignRoleToUser(
    @Body('userId', ParseIntPipe) userId: number,
    @Body('roleId', ParseIntPipe) roleId: number,
  ) {
    return await this.roleService.assignRoleToUser(userId, roleId);
  }

  @Post('/removeRoleFromUser')
  async removeRoleFromUser(
    @Body('userId', ParseIntPipe) userId: number,
    @Body('roleId', ParseIntPipe) roleId: number,
  ) {
    return await this.roleService.deleteRoleFromUser(userId, roleId);
  }
}
