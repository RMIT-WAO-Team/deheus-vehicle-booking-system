import {BookingRequest, TripType} from "./BookingRequest";
import {ChildEntity, Column} from "typeorm";

@ChildEntity(TripType.CONTINUOUS_TRIP)
export class ContinuousBookingRequest extends BookingRequest {
    @Column({ type: "timestamp" })
    returnDepartureTime: Date;

    @Column({ type: "timestamp" })
    returnArrivalTime: Date;

    @Column({ type: "int" })
    durationDays: number;
}