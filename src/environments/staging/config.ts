import { IEnvironmentConfigType } from '../IEnvironmentConfigType';

export const config: Partial<IEnvironmentConfigType> = {
  production: true,
  allowedOrigins: ['https://dev.domain.com', 'http://localhost:3000'],
  siteUrl: 'https://www.domain.com/',
  fileMaxSizeInBytes: 24576000, // 24MB
  supportEmail: 'abc3@xyz.com',
  logoUrl: 'https://www.domain.com/media/images/platform/WebLogo.png',
};
