export interface IEnvironmentConfigType {
  production: boolean;
  allowedOrigins: string[];
  siteUrl: string;
  fileMaxSizeInBytes: number;
  logoUrl: string;
  supportEmail: string;
  defaultNoOfMessageToSend: number;
  jwtExpiration: string;
  kafkaBrokers: string[];
  clientId: string;
  consumerGroupId: string;
  consumerUrl: string;
  producerUrl: string;
  moduleBootStartpTimeoutInMs: number;
}
