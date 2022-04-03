import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }

// passport-local để làm chức năng login xác thực ng dùng
// passport-jwt: verify token return request.user