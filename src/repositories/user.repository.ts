import AppDataSource from "../configs/data-source.config";
import {User, UserStatus} from "../entities/User";
import {Pagination} from "../dto/utils/pagination";
import {EntityManager} from "typeorm";

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

export const getUserById = async (id: string, manager?: EntityManager): Promise<User> => {
    const repo = manager ? manager.getRepository(User) : UserRepository;

    return await repo.findOne({
        where: {
            userId: id,
            status: UserStatus.ACTIVE
        },
        relations: {
            roles: true
        }
    });
};

export const existingUserByEmail = async (email: string, manager?: EntityManager): Promise<User> => {
    const repo = manager ? manager.getRepository(User) : AppDataSource.getRepository(User);

    return await repo.findOneBy({
        email: email
    });
};

export const existingUserByAccountUsername = async (username: string, manager?: EntityManager): Promise<User> => {
    const repo = manager ? manager.getRepository(User) : UserRepository;

    return await repo.findOne({
        relations: {
            account: true
        },
        where: {
            account: {
                username: username
            }
        }
    });
};


export default UserRepository;