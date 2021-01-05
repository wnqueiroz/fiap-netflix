import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { CreatedUserDto } from './dto/created-user.dto';
import { LoggedUserDto } from './dto/logged-user.dto';

import { SingInUserDto } from './dto/signin-user.dto';

import { SignUpUserDto } from './dto/signup-user.dto';

import { UsersService } from './users.service';

@Controller('/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signin')
  @HttpCode(200)
  async signin(@Body() signInUserDto: SingInUserDto): Promise<LoggedUserDto> {
    return this.usersService.signin(signInUserDto);
  }

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async signup(@Body() signUpUserDto: SignUpUserDto): Promise<CreatedUserDto> {
    return this.usersService.signup(signUpUserDto);
  }
}