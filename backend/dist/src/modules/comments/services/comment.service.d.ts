import { CommentEntity } from '../../../database/entities/comment.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CommentRepository } from '../../repository/services/comment.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { VenueRepository } from '../../repository/services/venue.repository';
import { CommentListQueryDto } from '../dto/req/comment-list.query.dto';
import { CreateCommentReqDto } from '../dto/req/create-comment.req.dto';
import { UpdateCommentReqDto } from '../dto/req/update-comment.req.dto';
export declare class CommentService {
    private readonly commentRepository;
    private readonly venueRepository;
    private readonly userRepository;
    constructor(commentRepository: CommentRepository, venueRepository: VenueRepository, userRepository: UserRepository);
    getListByVenue(userData: IUserData, venueId: string, query: CommentListQueryDto): Promise<[CommentEntity[], number]>;
    create(userData: IUserData, venueId: string, dto: CreateCommentReqDto): Promise<CommentEntity>;
    getById(userData: IUserData, commentId: string): Promise<CommentEntity>;
    update(userData: IUserData, commentId: string, dto: UpdateCommentReqDto): Promise<CommentEntity>;
    delete(userData: IUserData, commentId: string): Promise<void>;
    private assertRecommendationPermissions;
    private checkIsVenueExistOrThrow;
}
