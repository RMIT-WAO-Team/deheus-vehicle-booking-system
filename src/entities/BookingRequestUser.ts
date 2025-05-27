import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { User } from "./User";
import { BookingRequest } from "./BookingRequest";

export enum RoleInBooking {
    REQUESTER = 'requester',
    PASSENGER = 'passenger',
}

@Entity({ name: "booking_request_user" })
export class BookingRequestUser {
    @PrimaryColumn({ name: "user_id" })
    userId: string;

    @PrimaryColumn({ name: "booking_id" })
    bookingId: string;

    @Column({
        name: "role_in_booking",
        type: "enum",
        enum: RoleInBooking,
    })
    roleInBooking: RoleInBooking;

    @ManyToOne(() => User, user => user.bookingLinks)
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(() => BookingRequest, booking => booking.userLinks)
    @JoinColumn({ name: "bookingId" })
    booking: BookingRequest;
}
