import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { CurrentUserDto } from './dto/current-user.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validate(payload: JwtPayloadDto): Promise<CurrentUserDto> {
    return { name: payload.name, email: payload.email, id: payload.sub };
  }
}
