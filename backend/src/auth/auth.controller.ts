import { RtGuard } from './../share/guards/rt.guards';
import { AtGuard } from './../share/guards/at.guards';
import { AtStrategy } from './strategy/at.strategy';
import { GetUser } from './../share/decorator/get-user.decorator';
import {
  Body,
  Controller,
  Logger,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
// import { RtStrategy } from './strategy/rt.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    // private userService: UserService,
    private authService: AuthService
  ) {}
  logger = new Logger();
  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.loginUser(loginDto);
    res.cookie('refreshToken', user.refreshToken, { httpOnly: true });
    return {
      user: user.user,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };
  }

  @Post('/test')
  @UseGuards(RtGuard)
  test(@GetUser() user) {
    console.log('user', user);
    try {
      return 'success';
    } catch (error) {
      console.log('error', error.message);
    }
  }

  @Post('/refreshToken')
  async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies;
    const refreshTokenUser = await this.authService.checkRefreshTokenUser(refreshToken);
    // if (!refreshTokenUser) {
    //   throw new UnauthorizedException('Not Refresh Token');
    // }
    const decodedRefreshToken = this.authService.decodeRefreshToken(refreshToken);
    console.log('decodeRefreshToken', decodedRefreshToken);
    const userRefreshToken = await this.authService.refreshToken(decodedRefreshToken);
    res.cookie('refreshToken', userRefreshToken.refreshToken, { httpOnly: true });
    return {
      user: userRefreshToken.user,
      accessToken: userRefreshToken.accessToken,
      refreshToken: userRefreshToken.refreshToken,
    };
  }
}
