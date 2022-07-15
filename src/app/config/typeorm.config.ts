import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectedUsers } from '../chat/entities/connected-users';
import { Message } from '../chat/entities/message';
import { UserChatDetails } from '../chat/entities/user-chat-details';

export default (): {
  typeorm: TypeOrmModuleOptions;
} => {
  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV is not defined');
  }
  if (!process.env.DB_HOST1) {
    throw new Error('DB_HOST is not defined');
  }
  if (!process.env.DB_PORT) {
    throw new Error('DB_PORT is not defined');
  }
  if (!process.env.DB_USER) {
    throw new Error('DB_USER is not defined');
  }
  if (!process.env.DB_PASSWORD) {
    throw new Error('DB_PASSWORD is not defined');
  }
  if (!process.env.DB_NAME) {
    throw new Error('DB_NAME is not defined');
  }
  return {
    typeorm: {
      type: 'postgres',
      name: 'postgres',
      host: process.env.DB_HOST2,
      port: parseInt(process.env.DB_PORT),
      entities: [Message, ConnectedUsers, UserChatDetails],
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize:
        process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'local',
    },
  };
};
