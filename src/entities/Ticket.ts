import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Location} from "./Location";
import {BookingRequest} from "./BookingRequest";
import {Trip} from "./Trip";
import {User} from "./User";

export enum TicketStatus {
    PENDING = "pending",
    ONBOARD = "onboard",
    ABSENCE = "absence",
}

@Entity()
export class Ticket {
    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    tripId: string;

    @Column({
        type: "enum",
        enum: TicketStatus,
        default: TicketStatus.PENDING,
    })
    status: TicketStatus;

    @Column({ type: "boolean", default: false, name: "confirmed_pick_up" })
    confirmedPickUp: boolean;

    @Column({ type: "boolean", default: false, name: "confirmed_drop_off" })
    confirmedDropOff: boolean

    @ManyToOne(() => Location)
    @JoinColumn({ name: "pick_up_location_id" })
    pickUpLocation: Location;

    @ManyToOne(() => Location)
    @JoinColumn({ name: "drop_off_location_id" })
    dropOffLocation: Location;

    @ManyToOne(() => BookingRequest)
    @JoinColumn({ name: "booking_id" })
    bookingRequest: BookingRequest;

    @ManyToOne(() => Trip, (trip) => trip.tickets)
    @JoinColumn({ name: "tripId" })
    trip: Trip;

    @ManyToOne(() => User, (user) => user.tickets)
    @JoinColumn({ name: "userId" })
    user: User;
}