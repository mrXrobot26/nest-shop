import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: loginDTO) {
    // find user by email
    const user = await this.usersService.findUserByEmail(loginDTO.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // validate password
    const isMatch = await bcrypt.compare(loginDTO.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // payload
    const payload = { email: user.email, sub: user.id };
    // issue JWT
    return await this.jwtService.signAsync(payload);
  }

  async register(registerDTO: RegisterDTO) {
    const user = await this.usersService.createUser(registerDTO);
    const payload = { email: user.email, sub: user.id };
    return await this.jwtService.signAsync(payload);
  }
}
