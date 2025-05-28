import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {Trip} from "./Trip";
import {BaseLocation} from "./BaseLocation";

@Entity()
export class TripLocation {
    @PrimaryColumn()
    tripLocationId: string;

    @Column({ type: 'int' })
    stopOrder: number;

    @Column({ type: 'int' })
    currentCapacity: number;

    @Column({ type: 'timestamp' })
    arrivalTimeEstimated: Date;

    @Column({ type: 'timestamp' })
    arrivalTimeActual: Date;

    @OneToOne(() => BaseLocation)
    @JoinColumn({ name: "locationId" })
    location: BaseLocation;

    @ManyToOne(() => Trip, (trip) => trip.locations)
    @JoinColumn({ name: 'tripId' })
    trip: Trip;
}