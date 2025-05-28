import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from "typeorm";
import {User} from "./User";
import {Driver} from "./Driver";

enum ExecutiveStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

@Entity()
export class Executive {
    @PrimaryColumn()
    userId: string;

    @Column({
        type: "enum",
        enum: ExecutiveStatus,
    })
    status: ExecutiveStatus;

    @OneToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;

    @OneToOne(() => Driver, (driver) => driver.executive)
    @JoinColumn({ name: "driverId" })
    driver: Driver;
}