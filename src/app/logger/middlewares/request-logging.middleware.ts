import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { InjectLogger } from '../decorators/inject-logger.decorator';
import { Logger } from '../logger.service';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  constructor(@InjectLogger(RequestLoggingMiddleware) private logger: Logger) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      this.use.name,
      `\ncurl --location --request ${req.method} '${
        req.get('origin') || 'https://' + req.get('host')
      }${req.originalUrl}'\n ${this.getHeaderString(
        req,
      )}\n --data-raw '${JSON.stringify(req.body)}'\n\n\n`,
    );
    next();
  }

  private getHeaderString(req: Request) {
    let str = ``;
    for (const key in req.headers) {
      if (req.headers.hasOwnProperty(key)) {
        str += `--header '${key}: ${req.headers[key]}'  `;
      }
    }
    return str;
  }
}
