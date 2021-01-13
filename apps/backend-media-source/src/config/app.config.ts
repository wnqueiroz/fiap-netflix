import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    publicKey: process.env.JWT_PUBLIC_KEY.replace(/\\n/gm, '\n'),
    privateKey: process.env.JWT_PRIVATE_KEY.replace(/\\n/gm, '\n'),
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  kafka: {
    host: process.env.KAFKA_HOST,
    port: process.env.KAFKA_PORT,
  },
}));
