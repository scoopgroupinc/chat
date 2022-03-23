import { IEnvironmentConfigType } from '../IEnvironmentConfigType';

export const config: Partial<IEnvironmentConfigType> = {
  allowedOrigins: ['https://www.domain.com', 'http://localhost:3000'],
  fileMaxSizeInBytes: 24576000, // 24MB
  supportEmail: 'abc1@xyz.com',
};
