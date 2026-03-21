"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const config_static_1 = require("../../../config/config-static");
const role_enum_1 = require("../../../database/entities/enums/role.enum");
class UserMapper {
    static toResponseDTO(data, currentUserId) {
        const awsConfig = config_static_1.ConfigStaticService.get().aws;
        const roles = data.role ?? [];
        const resolveImage = (img) => {
            if (!img)
                return null;
            if (img.startsWith('http://') || img.startsWith('https://'))
                return img;
            return `${awsConfig.bucketUrl}/${img}`;
        };
        const isFollowed = currentUserId
            ? (data.followings ?? []).some((f) => f.follower_id === currentUserId)
            : false;
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            image: resolveImage(data.image),
            bio: data.bio,
            birthdate: data.birthdate ?? null,
            city: data.city ?? null,
            gender: data.gender ?? null,
            instagram: data.instagram ?? null,
            interests: data.interests ?? null,
            role: data.role ?? [],
            isFollowed,
            isCritic: roles.includes(role_enum_1.RoleUserEnum.CRITIC),
        };
    }
    static toIUserData(user, payload) {
        return {
            userId: payload.userId,
            deviceId: payload.deviceId,
            email: user.email,
            roles: user.role,
        };
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map