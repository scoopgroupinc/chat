import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { config } from 'src/environments/config';
import { IUserPayload } from '../auth/@types/IUserPayload';
import { UserStatusTypeForChat } from '../chat/@types/UserStatusTypeForChat';
import { ChatService } from '../chat/services/chat.service';
import { GetUser } from '../common/decorators/get-user.decorator';
import { ParseDatePipe } from '../common/pipes/parse-date.pipe';

@Controller()
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/:ofUserId')
  @ApiTags('chats')
  @ApiOperation({
    description: `Get chat message of user with other user. Provide one of fromDate or toDate. If both are provided, fromDate will be used. API will return ${config.defaultNoOfMessageToSend} messages.`,
    summary: 'Get chat message of user with other user',
  })
  public async getChat(
    @Query('fromDate', ParseDatePipe) fromDate: Date | null,
    @Query('toDate', ParseDatePipe) toDate: Date | null,
    @Param('ofUserId', ParseIntPipe) ofUserId: number,
    @GetUser() user: IUserPayload,
  ): Promise<any> {
    // TODO: Implement;
    throw new Error('Not implemented');
  }

  @Get('')
  @ApiTags('chats')
  @ApiOperation({
    summary: 'Get list of chats conversations',
    description:
      'Api should return list of chats conversations. it includes latest message and other user details and no of unread messages of that conversation.',
  })
  public async getChats(@GetUser() user: IUserPayload): Promise<any> {
    // TODO: Implement;
    throw new Error('Not implemented');
  }

  @Delete('/:ofUserId')
  @ApiTags('chats')
  @ApiOperation({
    description: `Delete chat will update userChatDetails table with lastDeleted = Date.now().`,
    summary: 'Delete chat conversation with other user',
  })
  public async deleteChat(
    @Param('ofUserId', ParseIntPipe) ofUserId: number,
    @GetUser() user: IUserPayload,
  ) {
    // TODO: Implement;
    throw new Error('Not implemented');
  }

  @Delete('/message/:messageId')
  @ApiTags('chats')
  @ApiOperation({
    description: `Delete chat will delete message from message table and notifies other user.`,
    summary: 'Delete chat message with other user',
  })
  public async deleteMessage(
    @Param('messageId', ParseIntPipe) messageId: number,
    @GetUser() user: IUserPayload,
  ) {
    // TODO: Implement;
    throw new Error('Not implemented');
  }

  @Patch('/user/:status')
  @ApiTags('chats')
  @ApiOperation({
    description: `Update user status.`,
    summary: 'Update user status',
  })
  public async updateUserStatus(
    @Param('status', new ParseEnumPipe(UserStatusTypeForChat))
    status: UserStatusTypeForChat,
    @GetUser() user: IUserPayload,
  ) {
    // TODO: Implement;
    throw new Error('Not implemented');
  }

  @Get('/user/:userId')
  @ApiTags('chats')
  @ApiOperation({
    description: `Get user details.`,
    summary: 'Get user details',
  })
  public async getUserDetails(
    @Param('userId', ParseIntPipe) userId: number,
    @GetUser() user: IUserPayload,
  ) {
    // TODO: Implement;
    throw new Error('Not implemented');
  }

  @UseInterceptors(FileInterceptor)
  @Post('upload')
  @ApiTags('chat')
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.OK)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: IUserPayload,
  ): Promise<any> {
    // TODO: Implement;
    throw new Error('Not implemented');
  }
}
