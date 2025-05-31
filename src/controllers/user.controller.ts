import {
    Body,
    Controller,
    Get, Param, Post, Put, QueryParams, Res
} from "routing-controllers";
import {Service} from "typedi";
import {Pagination} from "../dto/utils/pagination";
import {Response} from "express";
import {UserService} from "../services/implementation/user.service";
import {BaseController} from "./base.controller";
import {CreateUserRequestDto} from "../dto/user/create-user-request.dto";
import {UpdateUserRequestDto} from "../dto/user/update-user-request.dto";

@Controller("/users")
@Service()
export class UserController extends BaseController {
    constructor(private userService: UserService) {
        super();
    }

    @Get("")
    async getAll(@QueryParams() pagination: Pagination, @Res() res: Response) {
        const result = await this.userService.getAll(pagination);

        return this.sendResponse(res, result);
    }

    @Get("/:id")
    async getById(@Param("id") id: string, @Res() res: Response) {
        const result = await this.userService.getById(id);

        return this.sendResponse(res, result);
    }

    @Post("")
    async createUser(@Body() request: CreateUserRequestDto, @Res() res: Response) {
        const result = await this.userService.save(request);

        return this.sendResponse(res, result);
    }

    @Put("/:id")
    async updateUser(
        @Param("id") id: string,
        @Body() request: UpdateUserRequestDto,
        @Res() res: Response
    ) {
        const result = await this.userService.update(id, request);

        return this.sendResponse(res, result);
    }
}
