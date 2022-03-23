import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class HttpAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      return false;
    }
    const user = await this.authService.validateUser(token);
    if (!user) {
      return false;
    }
    request.user = user;
    return true;
  }
}
