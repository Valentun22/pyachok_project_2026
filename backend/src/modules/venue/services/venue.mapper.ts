import { VenueEntity } from '../../../database/entities/venue.entity';
import { UserMapper } from '../../users/services/user.mapper';
import { VenueListQueryDto } from '../dto/req/venue-list.query.dto';
import { VenueResDto } from '../dto/res/venue.res.dto';
import { VenueListResDto } from '../dto/res/venue-list.res.dto';
import { VenueListItemResDto } from '../dto/res/venue-list-item.res.dto';

type VenueMapperOpts = {
  isFavorite?: boolean;
};

export class VenueMapper {
  public static toResponseListDTO(
    entities: VenueEntity[],
    total: number,
    query: VenueListQueryDto,
  ): VenueListResDto {
    return {
      data: entities.map((e) => this.toResponseListItemDTO(e)), // без opts у загальному списку
      total,
      ...query,
    };
  }

  public static toResponseListItemDTO(
    entity: VenueEntity,
    opts?: VenueMapperOpts,
  ): VenueListItemResDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      created: entity.created,
      city: entity.city,
      avatarVenue: entity.avatarVenue,
      isActive: entity.isActive,
      isModerated: entity.isModerated,
      tags: entity.tags?.map((tag) => tag.name) ?? [],
      ratingAvg: (entity as any).ratingAvg ?? undefined,
      ratingCount: (entity as any).ratingCount ?? undefined,
      isLiked: (entity.likes?.length ?? 0) > 0,
      likesCount: (entity as any).likesCount ?? entity.likes?.length ?? 0,
      user: entity.user ? UserMapper.toResponseDTO(entity.user) : null,
      isFavorite: opts?.isFavorite ?? (entity as any).isFavorite ?? false,
    };
  }

  public static toResponseDTO(
    entity: VenueEntity,
    opts?: VenueMapperOpts,
  ): VenueResDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      created: entity.created,
      avatarVenue: entity.avatarVenue,
      image: entity.image ?? [],
      updated: entity.updated,
      city: entity.city,
      address: entity.address,
      averageCheck: entity.averageCheck,
      categories: entity.categories,
      isActive: entity.isActive,
      isModerated: entity.isModerated,
      hasWiFi: entity.hasWiFi,
      hasParking: (entity as any).hasParking,
      liveMusic: (entity as any).liveMusic,
      petFriendly: entity.petFriendly,
      hasTerrace: entity.hasTerrace,
      smokingAllowed: entity.smokingAllowed,
      cardPayment: entity.cardPayment,
      tags: entity.tags?.map((tag) => tag.name) ?? [],
      ratingAvg: (entity as any).ratingAvg ?? undefined,
      ratingCount: (entity as any).ratingCount ?? undefined,
      isLiked: (entity.likes?.length ?? 0) > 0,
      likesCount: (entity as any).likesCount ?? entity.likes?.length ?? 0,
      user: entity.user ? UserMapper.toResponseDTO(entity.user) : null,
      isFavorite: opts?.isFavorite ?? (entity as any).isFavorite ?? false,
      phone: entity.phone ?? null,
      email: entity.email ?? null,
      website: entity.website ?? null,
      socials: entity.socials ?? null,
      menu: entity.menu ?? null,
      workingHours: entity.workingHours ?? null,
    };
  }
}
