import {
    Controller,
    Get, QueryParams, Res
} from "routing-controllers";
import {Service} from "typedi";
import {Pagination} from "../dto/utils/pagination";
import {ApiResponse} from "../dto/response/api-response.dto";
import {UserDto} from "../dto/user/user-get.dto";
import {Response} from "express";
import {UserService} from "../services/implementation/user.service";
import {instanceToPlain} from "class-transformer";

@Controller("/users")
@Service()
export class UserController {
    constructor(private userService: UserService) {}

    @Get("")
    async getAll(@QueryParams() pagination: Pagination, @Res() res: Response) {
        const result: ApiResponse<UserDto[]> = await this.userService.getAll(pagination);

        return res.status(result.status).json(result);
    }
}
