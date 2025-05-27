import {BaseLocation, LocationSource} from "./BaseLocation";
import {ChildEntity, Column} from "typeorm";

export enum FixedLocationType {
    OFFICE = "office",
    FACTORY = "factory",
    WAREHOUSE = "warehouse",
}

@ChildEntity(LocationSource.FIXED)
export class FixedLocation extends BaseLocation {
    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({
        type: "enum",
        enum: FixedLocationType,
    })
    type: FixedLocationType;

}