import {IUserService} from "../user.service.interface";
import {UserDto} from "../../dto/user/user-get.dto";
import {Service} from "typedi";
import {getAllUsers} from "../../repositories/user.repository";
import {plainToInstance} from "class-transformer";
import {ApiResponse, ResponseBuilder} from "../../dto/response/api-response.dto";
import {Pagination} from "../../dto/utils/pagination";

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
}