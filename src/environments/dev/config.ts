import { IEnvironmentConfigType } from '../IEnvironmentConfigType';

export const config: Partial<IEnvironmentConfigType> = {
  allowedOrigins: ['*'],
  fileMaxSizeInBytes: 24576000, // 24MB
  supportEmail: 'noreply@scoop.love',
};
