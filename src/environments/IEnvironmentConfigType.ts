export interface IEnvironmentConfigType {
  production: boolean;
  allowedOrigins: string[];
  siteUrl: string;
  fileMaxSizeInBytes: number;
  logoUrl: string;
  supportEmail: string;
  defaultNoOfMessageToSend: number;
}
