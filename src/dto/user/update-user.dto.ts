import {Exclude, Expose} from "class-transformer";
import {UserStatus} from "../../entities/User";

@Exclude()
export class UpdateUserDto {
    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    profileImageUrl: string;

    @Expose()
    phoneNumber: string;

    @Expose()
    status: UserStatus;
}
