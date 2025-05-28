import {User} from "./User";
import {Column, Double, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn} from "typeorm";
import {Vehicle} from "./Vehicle";
import {Trip} from "./Trip";
import {BaseLocation} from "./BaseLocation";
import {TripExpense} from "./TripExpense";
import {Executive} from "./Executive";
import {LeaveRequest} from "./LeaveRequest";

export enum AvailabilityStatus {
    AVAILABLE = "available",
    ON_LEAVE = "on_leave",
    MAINTENANCE = "maintenance",
}

@Entity()
export class Driver {
    @PrimaryColumn()
    userId: string;

    @Column({
        type: "enum",
        enum: AvailabilityStatus,
        default: AvailabilityStatus.AVAILABLE,
    })
    availabilityStatus: AvailabilityStatus;

    @Column({
        type: "float",
        default: 0,
    })
    work_hours: Double;

    @OneToOne(() => Vehicle, (vehicle) => vehicle.driver)
    vehicle: Vehicle;

    @OneToOne(() => User, (user) => user.driver)
    @JoinColumn({ name: "userId" })
    user: User;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.driver)
    assignedTrips: Trip[];

    @ManyToOne(() => BaseLocation)
    @JoinColumn({ name: "currentLocationId" })
    currentLocation: BaseLocation;

    @OneToMany(() => TripExpense, (expense) => expense.driver)
    expenses: TripExpense[];

    @OneToOne(() => Executive, (executive) => executive.driver)
    executive: Executive;

    @OneToMany(() => LeaveRequest, (leaveRequest) => leaveRequest.driver)
    leaveRequests: LeaveRequest[]
}