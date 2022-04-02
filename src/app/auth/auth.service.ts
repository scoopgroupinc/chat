import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectLogger } from '../logger/decorators/inject-logger.decorator';
import { Logger } from '../logger/logger.service';
import { IUserPayload } from './@types/IUserPayload';

@Injectable()
export class AuthService {
  constructor(
    @InjectLogger(AuthService) private logger: Logger,
    private jwtService: JwtService,
  ) {}

  public async validateUser(token: string): Promise<IUserPayload> {
    const { userId, email } = await this.jwtService.verifyAsync(token);

    if (!(userId && email)) throw new UnauthorizedException();
    this.logger.debug(this.validateUser.name, `token: ${token}`);
    return {
      userId,
      email,
    };
  }
}
