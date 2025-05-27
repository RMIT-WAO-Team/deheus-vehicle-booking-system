import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete,
} from "routing-controllers";

@Controller()
export class UserController {
    @Get("/users")
    getAll() {
        return "This action returns all users";
    }

    @Get("/users/:id")
    getOne(@Param("id") id: number) {
        return {
            id: id,
            name: "Sample User",
            email: "sampleuser@gmail.com",
            profileImageUrl: "http://example.com/profile.jpg",
            phoneNumber: "123-456-7890",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    @Post("/users")
    post(@Body() user: any) {
        return "Saving user...";
    }

    @Put("/users/:id")
    put(@Param("id") id: number, @Body() user: any) {
        return "Updating a user...";
    }

    @Delete("/users/:id")
    remove(@Param("id") id: number) {
        return "Removing user...";
    }
}
