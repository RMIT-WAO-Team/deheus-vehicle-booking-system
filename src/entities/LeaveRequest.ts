import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Driver} from "./Driver";

export enum LeaveType {
    ANNUAL = "annual",
    SICK = "sick",
    URGENT = "urgent",
    PERSONAL = "personal",
    OTHER = "other"
}

@Entity()
export class LeaveRequest {
    @PrimaryColumn()
    leaveId: string;

    @Column({
        type: "enum",
        enum: LeaveType
    })
    leaveType: LeaveType;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    startDate: Date;

    @Column({ type: "timestamp" })
    endDate: Date;

    @Column({ type: "text" })
    reason: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @ManyToOne(() => Driver, (driver: Driver) => driver.leaveRequests)
    @JoinColumn({ name: "driverId" })
    driver: Driver;
}