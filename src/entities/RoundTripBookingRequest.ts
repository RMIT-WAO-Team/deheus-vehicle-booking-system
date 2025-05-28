import {BookingRequest, TripType} from "./BookingRequest";
import {ChildEntity, Column} from "typeorm";

@ChildEntity(TripType.ROUND_TRIP)
export class RoundTripBookingRequest extends BookingRequest {
    @Column({ type: "timestamp" })
    returnDepartureTime: Date;

    @Column({ type: "timestamp" })
    returnArrivalTime: Date;

    @Column({ type: "int" })
    durationDays: number;
}