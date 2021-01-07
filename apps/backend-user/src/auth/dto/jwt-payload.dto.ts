export class JwtPayloadDto {
  name: string;
  email: string;
  sub: string;
  iat?: string;
  exp?: string;
}
