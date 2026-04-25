import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { OAuthLoginReqDto } from './dto/req/oauth-login.req.dto';
import { SignInReqDto } from './dto/req/sign-in.req.dto';
import { SignUpReqDto } from './dto/req/sign-up.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { TokenPairResDto } from './dto/res/token-pair.res.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { IUserData } from './interfaces/user-data.interface';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpReqDto): Promise<{ message: string }> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth()
  @Post('sign-in')
  public async signIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    try {
      return await this.authService.signIn(dto);
    } catch {
      throw new UnauthorizedException();
    }
  }

  @SkipAuth()
  @Post('oauth')
  public async oAuthLogin(@Body() dto: OAuthLoginReqDto): Promise<AuthResDto> {
    return await this.authService.oAuthLogin(dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Verify email by token' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('verify-email')
  public async verifyEmail(@Query('token') token: string): Promise<void> {
    await this.authService.verifyEmail(token);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Resend verification email' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('resend-verification')
  public async resendVerification(
      @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.authService.resendVerificationEmail(userData.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @SkipAuth()
  @Post('refresh')
  public async refresh(
      @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('sign-out')
  public async signOut(@CurrentUser() userData: IUserData): Promise<void> {
    await this.authService.signOut(userData);
  }
}
