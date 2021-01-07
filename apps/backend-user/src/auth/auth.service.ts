import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';

import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { CurrentUserDto } from './dto/current-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  generateAccessToken(user: UserEntity): string {
    const payload: JwtPayloadDto = {
      name: user.name,
      email: user.email,
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }

  async validate(payload: JwtPayloadDto): Promise<CurrentUserDto> {
    const id = payload.sub;

    const user = await this.usersService.findById(id);

    if (!user) throw new UnauthorizedException('User not exists');

    const { name, email } = user;

    return { name, email, id };
  }
}
