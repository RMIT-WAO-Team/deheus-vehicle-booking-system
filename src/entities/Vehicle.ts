import {Entity, Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import {Driver} from "./Driver";
import {VehicleMaintenance} from "./VehicleMaintenance";

export enum VehicleType {
    COMPANY_OWNED = "company_owned",
    LONG_TERM_CONTRACT = "long_term_contract",
    OUTSOURCED = "outsourced",
}

export enum VehicleStatus {
    AVAILABLE = "available",
    IN_USE = "in_use",
    UNDER_MAINTENANCE = "under_maintenance",
    OUT_OF_SERVICE = "out_of_service",
    RESERVED = "reserved",
}

@Entity()
export class Vehicle {
    @PrimaryColumn()
    id: string;

    @Column({ type: "varchar", length: 255 })
    licensePlate: string;

    @Column({ type: "enum", enum: VehicleType })
    type: VehicleType;

    @Column({ type: "varchar", length: 255 })
    vehicleImageUrl: string;

    @Column({ type: "int" })
    capacity: number;

    @Column({ type: "varchar", length: 255 })
    color: string;

    @Column({ type: "enum", enum: VehicleStatus })
    status: VehicleStatus;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @OneToOne(() => Driver, (driver) => driver.vehicle)
    @JoinColumn({ name: "driverId" })
    driver: Driver;

    @OneToMany(() => VehicleMaintenance, (maintenance) => maintenance.vehicle)
    maintenances: VehicleMaintenance[];
}
