import { Injectable } from '@nestjs/common';
import { InjectLogger } from '../logger/decorators/inject-logger.decorator';
import { Logger } from '../logger/logger.service';
import { IUserPayload } from './@types/IUserPayload';

@Injectable()
export class AuthService {
  constructor(@InjectLogger(AuthService) private logger: Logger) {}

  public async validateUser(token: string): Promise<IUserPayload> {
    this.logger.debug(this.validateUser.name, `token: ${token}`);
    return {
      userId: 1,
    };
  }
}
