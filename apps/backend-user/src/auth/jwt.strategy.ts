import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CurrentUserDto } from './dto/current-user.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

import appConfig from '../config/app.config';
import { AuthService } from './auth.service';

ConfigModule.forRoot({
  load: [appConfig],
});

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().jwt.publicKey,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayloadDto): Promise<CurrentUserDto> {
    return this.authService.validate(payload);
  }
}
