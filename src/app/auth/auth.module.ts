import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from '../logger/logger.module';
import { AuthService } from './auth.service';
import { config } from 'src/environments/dev/config';

@Module({
  imports: [
    LoggerModule.forFeature({
      consumers: [AuthService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: config.jwtExpiration },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
