import {
    Middleware,
    ExpressErrorMiddlewareInterface,
    BadRequestError
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import { ValidationError } from "class-validator";
import {CustomErrorDto} from "../dto/utils/custom-error";
import {ResponseBuilder} from "../dto/response/api-response.dto";

interface ValidationBadRequestError extends BadRequestError {
    errors?: ValidationError[];
}

function isValidationError(error: unknown): error is ValidationBadRequestError {
    return (
        error instanceof BadRequestError &&
        "errors" in error &&
        Array.isArray((error as ValidationBadRequestError).errors)
    );
}

@Middleware({ type: "after" })
@Service()
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error(
        error: unknown,
        request: Request,
        response: Response,
        next: NextFunction
    ): void {
        console.log("Catch error!!", error);

        // * catch custom error
        if (error instanceof CustomErrorDto) {
            const responseData = ResponseBuilder
                .create()
                .withError(error.data)
                .withMessage(error.message)
                .withStatus(error.statusCode)
                .withMeta(null)
                .build();

            response.status(error.statusCode).json(responseData);
            return;
        }

        // * catch validation error in controller.
        if (isValidationError(error)) {
            const responseData = ResponseBuilder
                .create()
                .withError(extractErrors(error.errors!))
                .withMessage(error.message)
                .withStatus(400)
                .withMeta(null)
                .build();

            response.status(400).json(responseData);
            return;
        }

        // * catch general error
        response.status(500).json({
            success: false,
            status: 500,
            message: "Internal Server Error"
        });

        next();
    }
}

function extractErrors(errors: ValidationError[], parentProperty = "") {
    return errors.reduce((acc, err) => {
        const propertyName = parentProperty
            ? `${parentProperty}.${err.property}`
            : err.property;

        if (err.constraints) {
            acc.push({
                property: propertyName,
                constraints: err.constraints
            });
        }

        if (err.children && err.children.length > 0) {
            acc.push(...extractErrors(err.children, propertyName));
        }

        return acc;
    }, []);
}
