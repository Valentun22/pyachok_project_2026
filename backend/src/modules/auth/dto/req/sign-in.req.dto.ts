import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BaseAuthReqDto } from './base-auth.req.dto';

export class SignInReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'deviceId',
]) {
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
