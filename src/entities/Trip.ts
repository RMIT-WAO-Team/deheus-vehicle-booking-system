import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {Driver} from "./Driver";
import {TripLocation} from "./TripLocation";
import {TripExpense} from "./TripExpense";
import {TripFeedback} from "./TripFeedback";
import {Ticket} from "./Ticket";
import {Vendor} from "./Vendor";

enum TripStatus {
    SCHEDULED = "scheduled",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELED = "canceled",
}

@Entity()
export class Trip {
    @PrimaryColumn()
    tripId: string;

    @Column({ type: 'timestamp' })
    departureTime: Date;

    @Column({ type: 'timestamp' })
    arrivalTime: Date;

    @Column({ type: 'timestamp' })
    actualDepartureTime: Date;

    @Column({ type: 'timestamp' })
    actualArrivalTime: Date;

    @Column({
        type: 'enum',
        enum: TripStatus,
    })
    tripStatus: TripStatus;

    @Column({ type: 'float' })
    totalCost: number;

    @Column({ type: 'timestamp' })
    createdAt: Date;

    @Column({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => Driver, (driver) => driver.assignedTrips)
    @JoinColumn({ name: 'driverId' })
    driver: Driver;

    @ManyToOne(() => Vendor)
    @JoinColumn({ name: 'vendorId' })
    vendor: Vendor;

    @OneToMany(() => TripLocation, (location) => location.trip)
    locations: TripLocation[];

    @OneToMany(() => TripExpense, (expense) => expense.trip)
    expenses: TripExpense[];

    @OneToMany(() => TripFeedback, (feedback) => feedback.trip)
    feedbacks: TripFeedback[];

    @OneToMany(() => Ticket, (ticket) => ticket.trip)
    tickets: Ticket[];
}