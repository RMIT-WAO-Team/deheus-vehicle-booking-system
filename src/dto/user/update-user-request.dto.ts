import {IsOptional, IsString, Length, IsEmail, Matches, IsUrl, IsEnum} from "class-validator";
import {Exclude, Expose} from "class-transformer";
import {UserStatus} from "../../entities/User";

@Exclude()
export class UpdateUserRequestDto {
    @Expose()
    @IsOptional()
    @IsString()
    @Length(2, 50, {
        message: "Name must be between 2 and 50 characters"
    })
    name: string;

    @Expose()
    @IsOptional()
    @IsString()
    @IsEmail({}, { message: "Email must be a valid email address" })
    email: string;

    @Expose()
    @IsOptional()
    @IsString()
    @IsUrl({ }, { message: "Profile image URL must be a valid URL" })
    profileImageUrl: string;

    @Expose()
    @IsOptional()
    @IsString()
    @Matches(/^[0-9]{9,15}$/, { message: "Phone number must be 9 to 15 digits" })
    phoneNumber: string;

    @Expose()
    @IsOptional()
    @IsEnum(UserStatus, { message: "Status must be either 'active' or 'inactive'" })
    status: UserStatus;
}
