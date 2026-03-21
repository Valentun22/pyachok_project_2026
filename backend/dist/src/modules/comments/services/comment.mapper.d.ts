import { CommentEntity } from '../../../database/entities/comment.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CommentListQueryDto } from '../dto/req/comment-list.query.dto';
import { CommentResDto } from '../dto/res/comment.res.dto';
import { CommentListResDto } from '../dto/res/comment-list.res.dto';
import { CommentListItemResDto } from '../dto/res/comment-list-item.res.dto';
export declare class CommentMapper {
    static toResponseListDTO(userData: IUserData, entities: CommentEntity[], total: number, query: CommentListQueryDto): CommentListResDto;
    static toResponseListItemDTO(userData: IUserData, entity: CommentEntity): CommentListItemResDto;
    static toResponseDTO(userData: IUserData, entity: CommentEntity): CommentResDto;
}
