import { Injectable } from '@nestjs/common';

@Injectable()
export class ParseDatePipe {
  transform(value: any): Date | null {
    if (!value) {
      return null;
    }
    return new Date(value);
  }
}
