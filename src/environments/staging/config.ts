import { IEnvironmentConfigType } from '../IEnvironmentConfigType';

export const config: Partial<IEnvironmentConfigType> = {
  production: true,
  allowedOrigins: ['*'],
  siteUrl: 'https://scoop.love/',
  fileMaxSizeInBytes: 24576000, // 24MB
  supportEmail: 'noreply@scoop.love',
  logoUrl: 'https://scoop.love/media/images/platform/WebLogo.png',
  producerUrl: process.env.PRODUCER_URL,
};
