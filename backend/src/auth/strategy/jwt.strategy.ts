import { AuthService } from 'src/auth/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_CONFIG } from 'src/configs/constant.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,        // lựa chọn bỏ qua việc ktra thời hạn của token
            secretOrKey: JWT_CONFIG.secret,
        });
    }

    async validate(user) {
        return user;
    }
}
