import { Exclude } from 'class-transformer';

export class CreatedUserDto {
  id: number;

  name: string;

  email: string;

  access_token: string;

  @Exclude()
  password: string;

  @Exclude()
  salt: string;

  constructor(partial: Partial<CreatedUserDto>) {
    Object.assign(this, partial);
  }
}
