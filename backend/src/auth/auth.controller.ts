import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('/register')
  register(@Body() dto: RegisterDto): Promise<any> {
    return this.userService.createUser(dto);
  }
}
