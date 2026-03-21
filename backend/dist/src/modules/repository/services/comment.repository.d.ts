import { DataSource, Repository } from 'typeorm';
import { CommentEntity } from '../../../database/entities/comment.entity';
import { CommentListQueryDto } from '../../comments/dto/req/comment-list.query.dto';
export declare class CommentRepository extends Repository<CommentEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getListByVenue(currentUserId: string, venueId: string, query: CommentListQueryDto): Promise<[CommentEntity[], number]>;
    getByIdOrFail(currentUserId: string, commentId: string): Promise<CommentEntity>;
    findMyComments(userId: string, limit: number, offset: number): Promise<[CommentEntity[], number]>;
    getAllComments(limit: number, offset: number, search?: string): Promise<[any[], number]>;
}
