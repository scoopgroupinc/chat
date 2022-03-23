import { LoggerService } from '@nestjs/common';

// TODO: Need to add further implementation
export class Logger implements LoggerService {
  private className: string;

  constructor(className: string) {
    this.className = className;
  }

  private trace() {
    const obj: any = {};
    Error.captureStackTrace(obj, this.trace);
    return obj.stack;
  }

  public debug(caller: string, message: any, ...optionalParams: any[]) {
    console.debug(
      JSON.stringify(
        {
          className: this.className,
          methodName: caller,
          message,
          context: optionalParams,
        },
        null,
        2,
      ),
    );
  }

  public error(caller: string, message: any, ...optionalParams: any[]) {
    const trace = this.trace();
    console.error(
      JSON.stringify(
        {
          className: this.className,
          methodName: caller,
          message,
          context: optionalParams,
          trace,
        },
        null,
        2,
      ),
    );
  }

  public log(caller: string, message: any, ...optionalParams: any[]) {
    console.log(
      JSON.stringify(
        {
          className: this.className,
          methodName: caller,
          message,
          context: optionalParams,
        },
        null,
        2,
      ),
    );
  }

  public warn(caller: string, message: any, ...optionalParams: any[]) {
    console.warn(
      JSON.stringify(
        {
          className: this.className,
          methodName: caller,
          message,
          context: optionalParams,
        },
        null,
        2,
      ),
    );
  }

  public verbose(caller: string, message: any, ...optionalParams: any[]) {
    console.log(
      JSON.stringify(
        {
          className: this.className,
          methodName: caller,
          message,
          context: optionalParams,
        },
        null,
        2,
      ),
    );
  }
}
