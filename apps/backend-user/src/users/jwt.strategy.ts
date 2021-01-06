import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from '../config/app.config';

import { UsersService } from './users.service';
import { RequestUserDto } from './dto/request-user.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

ConfigModule.forRoot({
  load: [appConfig],
});

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig().jwt.publicKey,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayloadDto): Promise<RequestUserDto> {
    const id = payload.sub;

    const user = await this.usersService.findById(id);

    if (!user) throw new UnauthorizedException('User not exists');

    const { name, email } = user;

    return { name, email, id };
  }
}
