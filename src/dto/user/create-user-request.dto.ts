import { Exclude, Expose, Type } from "class-transformer";
import {
    ArrayNotEmpty,
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsString, IsUrl,
    IsUUID,
    Length,
    Matches
} from "class-validator";

@Exclude()
export class CreateUserRequestDto {
    @Expose()
    @IsString()
    @IsNotEmpty({ message: "Name is required" })
    @Length(2, 50, { message: "Name must be between 2 and 50 characters" })
    name: string;

    @Expose()
    @IsString()
    @IsNotEmpty({ message: "Email is required" })
    @IsEmail({}, { message: "Email must be a valid email address" })
    email: string;

    @Expose()
    @IsString()
    @IsNotEmpty({ message: "Profile image URL is required" })
    @IsUrl({ }, { message: "Profile image URL must be a valid URL" })
    profileImageUrl: string;

    @Expose()
    @IsString()
    @IsNotEmpty({ message: "Phone number is required" })
    @Matches(/^[0-9]{9,15}$/, { message: "Phone number must be 9 to 15 digits" })
    phoneNumber: string;

    @Expose()
    @IsString()
    @IsNotEmpty({ message: "Username is required" })
    @Length(4, 20, { message: "Username must be between 4 and 20 characters" })
    username: string;

    @Expose()
    @IsString()
    @IsNotEmpty({ message: "Password is required" })
    @Length(8, 100, { message: "Password must be at least 8 characters" })
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: "Password must contain uppercase, lowercase, number and special character" })
    password: string;

    @Expose()
    @IsArray()
    @ArrayNotEmpty({ message: "At least one role must be provided" })
    @Type(() => String)
    roleIds: string[];
}
