import {
    Controller,
    Get, Param, QueryParams, Res
} from "routing-controllers";
import {Service} from "typedi";
import {Pagination} from "../dto/utils/pagination";
import {Response} from "express";
import {UserService} from "../services/implementation/user.service";
import {BaseController} from "./base.controller";

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
}
