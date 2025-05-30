import { instanceToPlain } from "class-transformer";
import { Response } from "express";
import { ApiResponse } from "../dto/response/api-response.dto";

export abstract class BaseController {
    protected sendResponse<T>(res: Response, result: ApiResponse<T>): Response {
        // * Serialize the ApiResponse object, excluding any unset fields.
        const plainResult = instanceToPlain(result, {
            exposeUnsetFields: false
        });

        return res.status(result.status).json(plainResult);
    }
}
