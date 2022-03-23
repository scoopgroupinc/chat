export interface ILoggerModuleOptions {
  consumers: (new (...args: unknown[]) => unknown)[];
}
