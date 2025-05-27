import {BookingRequest, TripType} from "./BookingRequest";
import {ChildEntity} from "typeorm";

@ChildEntity(TripType.ONE_WAY)
export class OneWayBookingRequest extends BookingRequest{

}