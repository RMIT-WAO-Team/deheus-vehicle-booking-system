import {Exclude, Expose, Transform} from "class-transformer";

@Exclude()
export class UserDto {
    @Expose({ name: "userId" })
    id: string;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    profileImageUrl: string;

    @Expose()
    phoneNumber: string;

    // * Doesnt include roles yet.
}