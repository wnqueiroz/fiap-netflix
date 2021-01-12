import { Injectable } from '@nestjs/common';

import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { CurrentUserDto } from './dto/current-user.dto';

@Injectable()
export class AuthService {
  async validate(payload: JwtPayloadDto): Promise<CurrentUserDto> {
    return { name: payload.name, email: payload.email, id: payload.sub };
  }
}
