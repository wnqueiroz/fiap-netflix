import { IsNotEmpty } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty({
    message: 'Informe o título do chamado',
  })
  title: string;

  @IsNotEmpty({
    message: 'Informe a descrição do chamado',
  })
  description: string;
}
