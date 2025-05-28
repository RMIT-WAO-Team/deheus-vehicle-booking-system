import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Vehicle} from "./Vehicle";

@Entity()
export class VehicleMaintenance {
    @PrimaryColumn()
    maintenanceId: string;

    @Column({ type: 'decimal', precision: 8, scale: 2 })
    cost: number;

    @Column({ type: 'text' })
    note: string;

    @Column({ type: 'timestamp' })
    date: Date;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.maintenances)
    @JoinColumn({ name: "vehicleId" })
    vehicle: Vehicle;
}