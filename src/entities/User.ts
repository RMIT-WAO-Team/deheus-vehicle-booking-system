import {Entity, Column, PrimaryColumn, OneToOne, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Account } from "./Account";
import {Driver} from "./Driver";
import {Role} from "./Role";
import {BookingRequestUser} from "./BookingRequestUser";
import {Ticket} from "./Ticket";

export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

@Entity()
export class User {
    @PrimaryColumn()
    userId: string;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @Column({ type: "varchar", length: 255 })
    profileImageUrl: string;

    @Column({ type: "varchar", length: 15, unique: true })
    phoneNumber: string;

    @Column({ type: "enum" , enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @OneToOne(() => Account, (account) => account.user)
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
    roles: Role[];

    @OneToMany(() => Ticket, (ticket) => ticket.user)
    tickets: Ticket[];
}
