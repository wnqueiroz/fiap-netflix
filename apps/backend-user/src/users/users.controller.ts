import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';

import { CreatedUserDto } from './dto/created-user.dto';
import { LoggedUserDto } from './dto/logged-user.dto';
import { SingInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';

import { JwtAuthGuard } from './jwt-auth.guard';

import { UsersService } from './users.service';

@Controller('/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: { user: any }): any {
    return req.user;
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
