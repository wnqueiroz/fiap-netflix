import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { CreatedUserDto } from './dto/created-user.dto';
import { LoggedUserDto } from './dto/logged-user.dto';
import { SingInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetCurrentUser } from '../auth/auth.annotation';
import { CurrentUserDto } from '../auth/dto/current-user.dto';

import { UsersService } from './users.service';

@Controller('/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@GetCurrentUser() user: CurrentUserDto): CurrentUserDto {
    return user;
  }

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() signInUserDto: SingInUserDto): Promise<LoggedUserDto> {
    return this.usersService.signIn(signInUserDto);
  }

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async signUp(@Body() signUpUserDto: SignUpUserDto): Promise<CreatedUserDto> {
    return this.usersService.signUp(signUpUserDto);
  }
}
