import { Body, Controller, Post } from '@nestjs/common';
import { loginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDTO: loginDTO) {
    const accessToken = await this.authService.login(loginDTO);
    return { message: 'Login successful', accessToken };
  }

  @Post('/register')
  async register(@Body() registerDTO: RegisterDTO) {
    const accessToken = await this.authService.register(registerDTO);
    return { message: 'Registration successful', accessToken };
  }
}
