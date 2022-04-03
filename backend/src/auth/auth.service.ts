import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { pick } from 'lodash'
import { LoginDto } from './dto/login.dto';
import { isPasswordMatch } from 'src/share/utils/bcrytp.util';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email)
    if (user && isPasswordMatch(password, user.password)) {
      const { password, ...result } = user

      return result
    }

    return null
  }

  async registerUser(registerDto: RegisterDto) {
    return this.userService.createUser(registerDto)
  }

  async loginUser(loginDto: LoginDto) {
    const user = await this.userService.loginUser(loginDto)

    const token = await this.signPayload(pick(user, ['id', 'email', 'role']))

    return {
      user,
      token
    }
  }

  // generate access token
  async signPayload(payload: any) {
    const token = await this.jwtService.sign(payload)
    return token
  }
}
