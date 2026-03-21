import { TagEntity } from '../../../database/entities/tag.entity';
import { TagResDto } from '../dto/res/tag.res.dto';
export declare class TagMapper {
    static toResponseListDTO(entities: TagEntity[]): TagResDto[];
    static toResponseDTO(entity: TagEntity): TagResDto;
}
