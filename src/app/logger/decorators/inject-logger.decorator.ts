import { Inject } from '@nestjs/common';
import { PROVIDER_PREFIX } from '../constants';

export const InjectLogger = (
  entityClass: new (...args: unknown[]) => unknown,
) => Inject(PROVIDER_PREFIX + entityClass.name);
