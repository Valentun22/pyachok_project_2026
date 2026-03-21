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
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiFile } from '../../common/decorators/api-file.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CommentListQueryDto } from '../comments/dto/req/comment-list.query.dto';
import { MessageRepository } from '../repository/services/message.repository';
import { VenueResDto } from '../venue/dto/res/venue.res.dto';
import { ChangePasswordReqDto } from './dto/req/change-password.req.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { MyCommentListResDto } from './dto/res/my-comment-list.res.dto';
import { MyRatingListResDto } from './dto/res/my-rating-list.res.dto';
import { UserResDto } from './dto/res/user.res.dto';
import { UserMapper } from './services/user.mapper';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly messageRepository: MessageRepository,
  ) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData): Promise<UserResDto> {
    const result = await this.usersService.findMe(userData);
    return UserMapper.toResponseDTO(result);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Put('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResDto> {
    const result = await this.usersService.updateMe(userData, dto);
    return UserMapper.toResponseDTO(result);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiNoContentResponse({ description: 'User has been removed' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me')
  public async removeMe(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.usersService.removeMe(userData);
  }

  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiFile('avatar', false, false)
  @Post('me/avatar')
  public async uploadAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.uploadAvatar(userData, avatar);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me/avatar')
  public async deleteAvatar(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.deleteAvatar(userData);
  }

  @ApiBearerAuth()
  @Post('me/critic')
  public async addCriticRole(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResDto> {
    const result = await this.usersService.addCriticRole(userData);
    return UserMapper.toResponseDTO(result);
  }

  @ApiBearerAuth()
  @Delete('me/critic')
  public async removeCriticRole(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResDto> {
    const result = await this.usersService.removeCriticRole(userData);
    return UserMapper.toResponseDTO(result);
  }

  @ApiBearerAuth()
  @Post('me/venue-admin')
  public async addVenueAdminRole(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResDto> {
    const result = await this.usersService.addVenueAdminRole(userData);
    return UserMapper.toResponseDTO(result);
  }

  @ApiBearerAuth()
  @Delete('me/venue-admin')
  public async removeVenueAdminRole(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResDto> {
    const result = await this.usersService.removeVenueAdminRole(userData);
    return UserMapper.toResponseDTO(result);
  }

  @ApiBearerAuth()
  @Get('me/favorites')
  public async getMyFavorites(
    @CurrentUser() userData: IUserData,
  ): Promise<VenueResDto[]> {
    return await this.usersService.getMyFavoriteVenues(userData.userId);
  }

  @ApiBearerAuth()
  @Get('me/comments')
  public async getMyComments(
    @CurrentUser() userData: IUserData,
    @Query() query: CommentListQueryDto,
  ): Promise<MyCommentListResDto> {
    return await this.usersService.getMyComments(userData, query);
  }

  @ApiBearerAuth()
  @Get('me/ratings')
  public async getMyRatings(
    @CurrentUser() userData: IUserData,
    @Query() query: CommentListQueryDto,
  ): Promise<MyRatingListResDto> {
    return await this.usersService.getMyRatings(userData, query);
  }

  @ApiBearerAuth()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('me/password')
  public async changePassword(
    @CurrentUser() userData: IUserData,
    @Body() dto: ChangePasswordReqDto,
  ): Promise<void> {
    await this.usersService.changePassword(
      userData,
      dto.oldPassword,
      dto.newPassword,
    );
  }

  @Get('me/messages/unread-count')
  public async getUnreadCount(
    @CurrentUser() userData: IUserData,
  ): Promise<{ count: number }> {
    const count = await this.messageRepository.countUnread(userData.userId);
    return { count };
  }

  @ApiBearerAuth()
  @Get('me/followers')
  public async getFollowers(@CurrentUser() userData: IUserData) {
    const users = await this.usersService.getFollowers(userData);
    return users.map((u) => UserMapper.toResponseDTO(u));
  }

  @ApiBearerAuth()
  @Get('me/following')
  public async getFollowing(@CurrentUser() userData: IUserData) {
    const users = await this.usersService.getFollowing(userData);
    return users.map((u) => UserMapper.toResponseDTO(u));
  }

  @ApiBearerAuth()
  @Get(':userId/is-followed')
  public async isFollowed(
    @CurrentUser() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<{ isFollowed: boolean }> {
    const result = await this.usersService.checkIsFollowed(
      userData.userId,
      userId,
    );
    return { isFollowed: result };
  }

  @SkipAuth()
  @Get(':userId')
  public async findOne(
    @CurrentUser() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResDto> {
    const result = await this.usersService.findOne(userId);
    return UserMapper.toResponseDTO(result, userData?.userId ?? null);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(':userId/follow')
  public async follow(
    @CurrentUser() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.usersService.follow(userData, userId);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId/follow')
  public async unfollow(
    @CurrentUser() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.usersService.unfollow(userData, userId);
  }
}
