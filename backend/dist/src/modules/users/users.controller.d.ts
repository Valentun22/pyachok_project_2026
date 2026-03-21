import { IUserData } from '../auth/interfaces/user-data.interface';
import { CommentListQueryDto } from '../comments/dto/req/comment-list.query.dto';
import { MessageRepository } from '../repository/services/message.repository';
import { VenueResDto } from '../venue/dto/res/venue.res.dto';
import { ChangePasswordReqDto } from './dto/req/change-password.req.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { MyCommentListResDto } from './dto/res/my-comment-list.res.dto';
import { MyRatingListResDto } from './dto/res/my-rating-list.res.dto';
import { UserResDto } from './dto/res/user.res.dto';
import { UsersService } from './services/users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly messageRepository;
    constructor(usersService: UsersService, messageRepository: MessageRepository);
    findMe(userData: IUserData): Promise<UserResDto>;
    updateMe(userData: IUserData, dto: UpdateUserDto): Promise<UserResDto>;
    removeMe(userData: IUserData): Promise<void>;
    uploadAvatar(avatar: Express.Multer.File, userData: IUserData): Promise<void>;
    deleteAvatar(userData: IUserData): Promise<void>;
    addCriticRole(userData: IUserData): Promise<UserResDto>;
    removeCriticRole(userData: IUserData): Promise<UserResDto>;
    addVenueAdminRole(userData: IUserData): Promise<UserResDto>;
    removeVenueAdminRole(userData: IUserData): Promise<UserResDto>;
    getMyFavorites(userData: IUserData): Promise<VenueResDto[]>;
    getMyComments(userData: IUserData, query: CommentListQueryDto): Promise<MyCommentListResDto>;
    getMyRatings(userData: IUserData, query: CommentListQueryDto): Promise<MyRatingListResDto>;
    changePassword(userData: IUserData, dto: ChangePasswordReqDto): Promise<void>;
    getUnreadCount(userData: IUserData): Promise<{
        count: number;
    }>;
    getFollowers(userData: IUserData): Promise<UserResDto[]>;
    getFollowing(userData: IUserData): Promise<UserResDto[]>;
    isFollowed(userData: IUserData, userId: string): Promise<{
        isFollowed: boolean;
    }>;
    findOne(userData: IUserData, userId: string): Promise<UserResDto>;
    follow(userData: IUserData, userId: string): Promise<void>;
    unfollow(userData: IUserData, userId: string): Promise<void>;
}
