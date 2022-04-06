import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {}

// passport-local để làm chức năng login xác thực ng dùng
// passport-jwt: verify token return request.user
