import {Column, Entity, PrimaryColumn, TableInheritance} from "typeorm";

export enum LocationSource {
    FIXED = "fixed",
    CUSTOM = "custom"
}

@Entity({ name: 'location' })
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class BaseLocation {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    googlePlaceId: string;

    @Column({ type: 'text' })
    address: string;

    @Column({ type: "double precision"})
    latitude: number;

    @Column({ type: "double precision"})
    longitude: number;

    @Column({ type: "timestamp" })
    createdAt: Date;

    @Column({ type: "timestamp" })
    updatedAt: Date;

}