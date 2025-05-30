import {UserDto} from "../dto/user/user-get.dto";
import {ApiResponse} from "../dto/response/api-response.dto";
import {Pagination} from "../dto/utils/pagination";

export interface IUserService {
    /**
     * Retrieves a paginated list of users.
     *
     * @param pagination - Object containing pagination parameters (page number and size).
     * @returns Promise resolving to an array of UserDto objects.
     */
    getAll(pagination: Pagination): Promise<ApiResponse<UserDto[]>>;
}