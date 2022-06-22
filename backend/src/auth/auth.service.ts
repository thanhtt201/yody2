import { JWT_CONFIG } from 'src/configs/constant.config';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { pick } from 'lodash';
import { LoginDto } from './dto/login.dto';
import { isPasswordMatch } from 'src/share/utils/bcrytp.util';
import { sign, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user && isPasswordMatch(password, user.password)) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async registerUser(registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }

  async loginUser(loginDto: LoginDto) {
    const user = await this.userService.loginUser(loginDto);

    // const token = await this.signPayload(pick(user, ['id', 'email', 'role']))
    const accessToken = this.signPayload({
      userId: user.id,
      email: user.email,
    });
    const refreshToken = sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_CONFIG.refreshSecret,
      {
        expiresIn: '1h',
      }
    );
    const userFind = await this.userService.findUserByEmail(loginDto.email);
    userFind.refreshToken = refreshToken;
    await this.userService.updateRefreshTokenUser(userFind);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  // generate access token
  signPayload(payload: any) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async refreshToken(user: any): Promise<any> {
    const accessToken = this.signPayload({
      userId: user.userId,
      email: user.email,
    });
    const refreshToken = sign(
      {
        userId: user.userId,
        email: user.email,
      },
      JWT_CONFIG.refreshSecret,
      {
        expiresIn: '1h',
      }
    );
    const userFind = await this.userService.findUserByEmail(user.email);
    userFind.refreshToken = refreshToken;
    await this.userService.updateRefreshTokenUser(userFind);
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async checkRefreshTokenUser(refreshToken: string): Promise<any> {
    return await this.userService.checkRefreshTokenUser(refreshToken);
  }

  decodeRefreshToken(refreshToken: string) {
    return verify(refreshToken, JWT_CONFIG.refreshSecret);
  }
}
