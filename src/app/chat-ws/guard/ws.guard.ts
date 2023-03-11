import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class WSGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp();

    const token = request.getRequest().handshake.headers.authorization;
    if (!token) {
      return false;
    }
    const user = await this.authService.validateUser(token);
    if (!user) {
      return false;
    }
    //@ts-ignore
    request.args[1].userID = user.userId;
    return true;
  }
}
