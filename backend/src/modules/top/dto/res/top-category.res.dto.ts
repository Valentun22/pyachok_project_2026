import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TopCategoryResDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  order: number;

  @ApiPropertyOptional()
  venues?: { id: string; name: string; city?: string; avatarVenue?: string }[];
}
