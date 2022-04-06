import { JWT_CONFIG } from 'src/configs/constant.config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload, JwtPayloadWithRt } from '../../share/types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONFIG.refreshSecret,
      // passReqToCallback: true,
    });
  }

  async validate(payload) {
    try {
      console.log('edqweqweq');

      return payload;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
