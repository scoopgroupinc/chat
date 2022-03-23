import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    LoggerModule.forFeature({
      consumers: [AuthService],
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
