import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { CreatedUserDto } from './dto/created-user.dto';
import { LoggedUserDto } from './dto/logged-user.dto';
import { SingInUserDto } from './dto/signin-user.dto';
import { SignUpUserDto } from './dto/signup-user.dto';

import { UserEntity } from './user.entity';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async signUp(signUpUserDto: SignUpUserDto): Promise<CreatedUserDto> {
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
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    const createdUser = await this.create(user);

    return new CreatedUserDto({
      ...createdUser,
      access_token: this.authService.generateAccessToken(user),
    });
  }

  async signIn(signInUserDto: SingInUserDto): Promise<LoggedUserDto> {
    const { email, password } = signInUserDto;

    const user = await this.findByEmail(email);

    if (!user || !user.checkPassword(password)) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'Invalid e-mail or password',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return {
      access_token: this.authService.generateAccessToken(user),
    };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  findById(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
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
