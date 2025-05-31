import {Entity, Column, PrimaryColumn, OneToOne, ManyToMany, JoinTable, OneToMany, EntityManager} from "typeorm";
import { Account } from "./Account";
import {Driver} from "./Driver";
import {Role} from "./Role";
import {BookingRequestUser} from "./BookingRequestUser";
import {Ticket} from "./Ticket";
import {Exclude, Expose} from "class-transformer";
import {CreateUserRequestDto} from "../dto/user/create-user-request.dto";
import {getRolesById} from "../repositories/role.repository";
import * as bcrypt from 'bcrypt';
import {CustomErrorDto} from "../dto/utils/custom-error";
import {UpdateUserRequestDto} from "../dto/user/update-user-request.dto";
import {existingUserByEmail} from "../repositories/user.repository";
import { safeAssign} from "../configs/helper";

export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

@Entity()
@Exclude()
export class User {
    @PrimaryColumn()
    @Expose()
    userId: string;

    @Column({ type: "varchar", length: 255 })
    @Expose()
    name: string;

    @Column({ type: "varchar", length: 255, unique: true })
    @Expose()
    email: string;

    @Column({ type: "varchar", length: 255 })
    @Expose()
    profileImageUrl: string;

    @Column({ type: "varchar", length: 15, unique: true })
    @Expose()
    phoneNumber: string;

    @Column({ type: "enum" , enum: UserStatus, default: UserStatus.ACTIVE })
    @Expose()
    status: UserStatus;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @OneToOne(() => Account, (account) => account.user, {
        cascade: true,
    })
    @Expose()
    account: Account;

    @OneToMany(() => BookingRequestUser, bru => bru.user)
    bookingLinks: BookingRequestUser[];

    @OneToOne(() => Driver, (driver) => driver.user)
    driver: Driver;

    @ManyToMany(() => Role, {
        cascade: ["insert", "update", "recover"],
    })
    @JoinTable({
        name: "user_roles",
        joinColumn: { name: "user_id", referencedColumnName: "userId" },
        inverseJoinColumn: { name: "role_id", referencedColumnName: "roleId" },
    })
    @Expose()
    roles: Role[];

    @OneToMany(() => Ticket, (ticket) => ticket.user)
    tickets: Ticket[];

    static async toUser(request: CreateUserRequestDto, manager: EntityManager) {
        const roles = await getRolesById(request.roleIds, manager);

        if (roles.length < request.roleIds.length) {
            throw new CustomErrorDto("There is at least one invalid role", 404)
        }

        const user = new User();
        const account = new Account();

        account.username = request.username;
        // * hash the password using bcrypt.
        account.password = await bcrypt.hash(request.password, 10);

        user.userId = request.name + request.email; // ? place holder, waiting for algo to generate userId.
        user.name = request.name;
        user.email = request.email;
        user.profileImageUrl = request.profileImageUrl;
        user.phoneNumber = request.phoneNumber;
        user.status = UserStatus.ACTIVE;
        user.roles = roles;
        user.account = account;

        return user;
    }
}
