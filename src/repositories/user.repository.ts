import AppDataSource from "../configs/data-source.config";
import {User, UserStatus} from "../entities/User";
import {Pagination} from "../dto/utils/pagination";

const UserRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (pagination: Pagination): Promise<[User[], number]> => {
    console.log("Pagination debug:", pagination);
    console.log("Types:", typeof pagination.page, typeof pagination.size);

    // * retrieve list of users (only active) and apply pagination.
    return await UserRepository.findAndCount({
        relations: {
            roles: true
        },
        select: {
            userId: true,
            name: true,
            email: true,
            profileImageUrl: true,
            phoneNumber: true
        },
        skip: (pagination.page - 1) * pagination.size,
        take: pagination.size,
        where: {
            status: UserStatus.ACTIVE
        }
    });
};


export default UserRepository;