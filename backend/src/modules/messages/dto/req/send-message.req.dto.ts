import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SendMessageReqDto {
  @ApiProperty({ example: 'Привіт! Хочу приєднатись до твоєї компанії 🍺' })
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  text: string;

  @ApiPropertyOptional({ example: 'uuid-of-pyachok' })
  @IsOptional()
  @IsUUID()
  pyachokId?: string;
}
