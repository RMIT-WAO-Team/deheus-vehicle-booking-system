import {UserDto} from "../dto/user/user-get.dto";
import {ApiResponse} from "../dto/response/api-response.dto";
import {Pagination} from "../dto/utils/pagination";
import {CreateUserRequestDto} from "../dto/user/create-user-request.dto";
import {UpdateUserRequestDto} from "../dto/user/update-user-request.dto";

export interface IUserService {
    /**
     * Retrieves a paginated list of users.
     *
     * @param pagination - Object containing pagination parameters (page number and size).
     * @returns Promise resolving to an array of UserDto objects.
     */
    getAll(pagination: Pagination): Promise<ApiResponse<UserDto[]>>;

    /**
     * Retrieves a user by their unique identifier.
     *
     * @param id - The unique identifier of the user.
     * @returns Promise resolving to an ApiResponse containing the UserDto of the user.
     */
    getById(id: string): Promise<ApiResponse<UserDto>>;

    /**
     * Creates and saves a new user based on the provided request data.
     *
     * @param request - The CreateUserRequestDto containing user information and role assignments.
     * @returns Promise resolving to an ApiResponse containing the created UserDto.
     */
    save(request: CreateUserRequestDto): Promise<ApiResponse<UserDto>>;

    /**
     * Updates an existing user with the provided request data.
     *
     * @param id - The unique identifier of the user to update.
     * @param request - The UpdateUserRequestDto containing fields to update.
     * @returns Promise resolving to an ApiResponse containing the updated UserDto.
     */
    update(id: string, request: UpdateUserRequestDto): Promise<ApiResponse<UserDto>>;
}