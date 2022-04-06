import { GetUser } from './../share/decorator/get-user.decorator';
import { AtGuard } from './../share/guards/at.guards';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseGuards(AtGuard)
  listUser(@GetUser() user) {
    console.log('user', user);
    return this.userService.findAll();
  }
}
