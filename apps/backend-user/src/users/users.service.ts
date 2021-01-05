import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatedUserDto } from './dto/created-user.dto';
import { LoggedUserDto } from './dto/logged-user.dto';
import { SingInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';

import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(signUpUserDto: SignUpUserDto): Promise<CreatedUserDto> {
    const { name, password, passwordConfirmation, email } = signUpUserDto;

    const userExists = await this.findByEmail(email);

    if (userExists) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'User already exists',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (password !== passwordConfirmation) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Password and confirmation do not match',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = new UserEntity();

    user.email = email;
    user.name = name;
    user.password = password;

    const createdUser = await this.create(user);

    return new CreatedUserDto({
      ...createdUser,
      access_token: 'lorem',
    });
  }

  async signin(signInUserDto: SingInUserDto): Promise<LoggedUserDto> {
    const { email } = signInUserDto;

    const user = await this.findByEmail(email);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Invalid e-mail or password',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return {
      access_token: 'lorem',
    };
  }

  private findByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  private create(user: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }
}
