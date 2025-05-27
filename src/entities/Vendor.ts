import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import {BaseLocation} from "./BaseLocation";

export enum VendorStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

@Entity()
export class Vendor {
    @PrimaryColumn()
    vendorId: string;

    @Column({ type: "varchar", length: 255 })
    vendorName: string;

    @Column({ type: "varchar", length: 255 })
    contactPersonName: string;

    @Column({ type: "varchar", length: 15 })
    contactPhone: string;

    @Column({ type: "text" })
    address: string;

    @Column({ type: "text" })
    pricingPolicy: string;

    @Column({ type: "enum", enum: VendorStatus, default: VendorStatus.ACTIVE })
    status: VendorStatus;

    @OneToOne(() => BaseLocation)
    @JoinColumn({ name: 'baseLocationId' })
    serviceArea: BaseLocation;
}