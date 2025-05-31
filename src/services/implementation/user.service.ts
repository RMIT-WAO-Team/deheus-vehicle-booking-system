import {IUserService} from "../user.service.interface";
import {UserDto} from "../../dto/user/user-get.dto";
import {Service} from "typedi";
import {
    existingUserByAccountUsername,
    existingUserByEmail,
    getAllUsers,
    getUserById
} from "../../repositories/user.repository";
import {plainToInstance} from "class-transformer";
import {ApiResponse, ResponseBuilder} from "../../dto/response/api-response.dto";
import {Pagination} from "../../dto/utils/pagination";
import {CustomErrorDto} from "../../dto/utils/custom-error";
import {CreateUserRequestDto} from "../../dto/user/create-user-request.dto";
import AppDataSource from "../../configs/data-source.config";
import {User} from "../../entities/User";
import {UpdateUserRequestDto} from "../../dto/user/update-user-request.dto";
import {UpdateUserDto} from "../../dto/user/update-user.dto";

@Service()
export class UserService implements IUserService {
    async getAll(pagination: Pagination): Promise<ApiResponse<UserDto[]>> {
        const [users, total] = await getAllUsers(pagination);

        // * empty list
        if (users.length === 0) {
            return ResponseBuilder.create<UserDto[]>()
                .withData([])
                .withMessage("no users found")
                .withStatus(204)
                .build();
        }

        const usersDto: UserDto[] = plainToInstance(UserDto, users, {
            excludeExtraneousValues: true
        });

        // * transform to dto.
        return ResponseBuilder.create<UserDto[]>()
            .withStatus(200)
            .withMessage("list of users")
            .withData(usersDto)
            .withMeta({
                pagination: {
                    currentPage: pagination.page,
                    size: pagination.size,
                    totalPage: pagination.getTotalPage(total),
                }
            })
            .build();
    }

    async getById(id: string): Promise<ApiResponse<UserDto>> {
        const user = await getUserById(id);

        if (!user)
            throw new CustomErrorDto("User not found", 404, null);

        const userDto: UserDto = plainToInstance(UserDto, user, {
            excludeExtraneousValues: true
        });

        return ResponseBuilder.create<UserDto>()
            .withStatus(200)
            .withMessage("user detail")
            .withData(userDto)
            .build();
    }

    async save(request: CreateUserRequestDto): Promise<ApiResponse<UserDto>> {
        // * check existing email and account.
        const existByEmail = await existingUserByEmail(request.email);
        const existByUsername = await existingUserByAccountUsername(request.username);
        if (existByEmail) throw new CustomErrorDto("Email already exists", 400);
        if (existByUsername) throw new CustomErrorDto("Username already exists", 400);

        // * start transaction and save user to db.
        const user = await AppDataSource.transaction(async (manager) => {
            // * create User base on the request
            const data = await User.toUser(request, manager);
            return await manager.save(data);
        });

        const userDto = plainToInstance(UserDto, user, {
            excludeExtraneousValues: true
        });

        return ResponseBuilder.create<UserDto>()
            .withStatus(201)
            .withMessage("User created successfully")
            .withData(userDto)
            .build();
    }

    async update(id: string, request: UpdateUserRequestDto): Promise<ApiResponse<UserDto>> {
        await AppDataSource.transaction(async (manager) => {
            // Check email if needed
            if (request.email) {
                const existingEmailUser = await existingUserByEmail(request.email, manager);
                if (existingEmailUser && existingEmailUser.userId !== id) {
                    throw new CustomErrorDto("Email already exists", 400);
                }
            }

            // Convert to DTO
            const data = plainToInstance(UpdateUserDto, request, {
                excludeExtraneousValues: true
            });

            // Run update
            await manager.update(User, { userId: id }, { ...data });
        });

        // After transaction → reload updated user
        const updatedUser = await getUserById(id);

        const userDto = plainToInstance(UserDto, updatedUser, {
            excludeExtraneousValues: true
        });

        // Return API response
        return ResponseBuilder.create<UserDto>()
            .withStatus(200)
            .withMessage("User updated successfully")
            .withData(userDto)
            .build();
    }

}