import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { SendMessageReqDto } from './dto/req/send-message.req.dto';
import { MessageService } from './services/message.service';

@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller()
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @ApiOperation({ summary: 'My inbox' })
  @Get('messages/inbox')
  inbox(
    @CurrentUser() user: IUserData,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.service.getInbox(
      user,
      Number(limit) || 20,
      Number(offset) || 0,
    );
  }

  @ApiOperation({ summary: 'My sent messages' })
  @Get('messages/sent')
  sent(
    @CurrentUser() user: IUserData,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.service.getSent(user, Number(limit) || 20, Number(offset) || 0);
  }

  @ApiOperation({ summary: 'Unread count' })
  @Get('users/me/messages/unread-count')
  unreadCount(@CurrentUser() user: IUserData) {
    return this.service.countUnread(user);
  }

  @ApiOperation({ summary: 'Mark all inbox as read' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('messages/read-all')
  markAllRead(@CurrentUser() user: IUserData) {
    return this.service.markAllRead(user);
  }

  @ApiOperation({ summary: 'Get dialog with user' })
  @Get('messages/dialog/:userId')
  dialog(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @CurrentUser() user: IUserData,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.service.getDialog(
      user,
      userId,
      Number(limit) || 50,
      Number(offset) || 0,
    );
  }

  @ApiOperation({ summary: 'Send message to user' })
  @Post('messages/to/:recipientId')
  send(
    @Param('recipientId', new ParseUUIDPipe()) recipientId: string,
    @CurrentUser() user: IUserData,
    @Body() dto: SendMessageReqDto,
  ) {
    return this.service.send(user, recipientId, dto);
  }

  @ApiOperation({ summary: 'Mark message as read' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('messages/:id/read')
  markRead(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: IUserData,
  ) {
    return this.service.markRead(user, id);
  }

  @ApiOperation({ summary: 'Delete message' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('messages/:id')
  delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: IUserData,
  ) {
    return this.service.deleteMessage(user, id);
  }
}
