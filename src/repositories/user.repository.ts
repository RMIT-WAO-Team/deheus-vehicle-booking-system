import AppDataSource from "../configs/data-source.config";
import {User, UserStatus} from "../entities/User";
import {Pagination} from "../dto/utils/pagination";

const UserRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (pagination: Pagination): Promise<[User[], number]> => {
    // * retrieve list of users (only active) and apply pagination.
    const skip = (pagination.page - 1) * pagination.size;

    return await UserRepository.findAndCount({
        skip: skip,
        take: pagination.size,
        where: {
            status: UserStatus.ACTIVE
        }
    });
};

export const getUserById = async (id: string): Promise<User> => {
    return await UserRepository.findOne({
        where: {
            userId: id,
            status: UserStatus.ACTIVE
        }
    })
}

export default UserRepository;