import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Trip} from "./Trip";
import {Driver} from "./Driver";

export enum ExpenseType {
    FUEL = "fuel",
    TOLL = "toll",
    PARKING = "parking",
    MEAL = "meal",
    MAINTENANCE = "maintenance",
    OTHER = "other"
}

@Entity()
export class TripExpense {
    @PrimaryColumn()
    tripExpenseId: string;

    @Column({
        type: "enum",
        enum: ExpenseType
    })
    type: ExpenseType;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    amount: number;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "varchar", length: 255})
    receiptPhotoUrl: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToOne(() => Trip, (trip) => trip.expenses)
    @JoinColumn({ name: "tripId" })
    trip: Trip;

    @ManyToOne(() => Driver, (driver) => driver.expenses)
    @JoinColumn({ name: "driverId" })
    driver: Driver;
}