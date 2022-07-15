import { config as devEnvironment } from './dev/config';
import { config as prodEnvironment } from './prod/config';
import { config as stagingEnvironment } from './staging/config';
import { IEnvironmentConfigType } from './IEnvironmentConfigType';
import { EnvironmentTypeEnum } from './EnvironmentTypeEnum';

let config: IEnvironmentConfigType;

const defaultConfig: IEnvironmentConfigType = {
  production: false,
  allowedOrigins: ['*'],
  siteUrl: 'https://www.domain.com/',
  fileMaxSizeInBytes: 24576000, // 24MB
  supportEmail: 'noreply@scoop.love',
  logoUrl: 'https://www.domain.com/media/images/platform/WebLogo.png',
  defaultNoOfMessageToSend: 50,
  jwtExpiration: '1d',
  kafkaBrokers: ['127.0.0.1:39094'],
  clientId: 'CHATCLIENTID',
  consumerGroupId: ''
};

if (process.env.NODE_ENV === EnvironmentTypeEnum.PRODUCTION) {
  config = {
    ...defaultConfig,
    ...prodEnvironment,
  };
} else if (process.env.NODE_ENV === EnvironmentTypeEnum.STAGING) {
  config = {
    ...defaultConfig,
    ...stagingEnvironment,
  };
} else {
  config = {
    ...defaultConfig,
    ...devEnvironment,
  };
}

export { config };
