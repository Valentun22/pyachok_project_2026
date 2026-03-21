import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class ChangePasswordReqDto {
  @ApiProperty({ example: 'OldPass123!' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: 'NewPass123!' })
  @IsString()
  @Length(8, 100)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/, {
    message: 'Пароль: мін. 8 символів, літера + цифра + спецсимвол (@$!%_*#?&)',
  })
  newPassword: string;
}
