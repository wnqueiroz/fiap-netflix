import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SingInUserDto {
  @IsNotEmpty({
    message: 'Informe o endereço de email',
  })
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Informe a senha',
  })
  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  password: string;
}
