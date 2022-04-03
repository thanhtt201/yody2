import { GetUser } from './../share/decorator/get-user.decorator';
import { JwtAuthGuard } from './../share/guards/jwt.guards';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    // private userService: UserService,
    private authService: AuthService
  ) { }

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto)
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto)
  }

  @Post('/test')
  @UseGuards(JwtAuthGuard)
  test(@GetUser() user) {
    try {
      return 'success'
    } catch (error) {
      console.log('error', error.message)
    }
  }
}
