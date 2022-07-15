import { IEnvironmentConfigType } from '../IEnvironmentConfigType';

export const config: Partial<IEnvironmentConfigType> = {
  production: true,
  allowedOrigins: ['*'],
  siteUrl: 'https://www.domain.com/',
  fileMaxSizeInBytes: 24576000, // 24MB
  supportEmail: 'abc2@xyz.com',
  logoUrl: 'https://www.domain.com/media/images/platform/WebLogo.png',
};
