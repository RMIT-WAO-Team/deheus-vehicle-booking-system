import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, TableInheritance} from "typeorm";
import {BookingRequestUser} from "./BookingRequestUser";
import {User} from "./User";
import {BaseLocation} from "./BaseLocation";

export enum TripType {
    ONE_WAY = "one_way",
    ROUND_TRIP = "round_trip",
    CONTINUOUS_TRIP = "continuous_trip"
}

export enum RequesterType {
    INDIVIDUAL = "individual",
    GROUP = "group",
    VIP = "vip",
}

export enum Status {
    DRAFT = "draft",
    PENDING = "pending",
    APPROVED = "approved",
    ASSIGNED = "assigned",
    CANCELLED = "cancelled",
}

@Entity()
@TableInheritance({ column: {type: "varchar", name: "type"}})
export class BookingRequest {
    @PrimaryColumn()
    bookingId: string;

    @Column({
        type: "enum",
        enum: RequesterType
    })
    requesterType: RequesterType;

    @Column({ type: "timestamp", nullable: false })
    departureTime: Date;

    @Column({ type: "timestamp", nullable: false })
    arrivalTime: Date;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.PENDING
    })
    status: Status;

    @Column({ type: "int", default: 0 })
    numberOfPassengers: number;

    @Column({ type: "text" })
    note: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @OneToMany(() => BookingRequestUser, bru => bru.booking, { cascade: true })
    userLinks: BookingRequestUser[];

    @ManyToOne(() => BaseLocation)
    @JoinColumn({ name: "pickUpLocationId" })
    pickUpLocation: BaseLocation;

    @ManyToOne(() => BaseLocation)
    @JoinColumn({ name: "dropOffLocationId" })
    dropOffLocation: BaseLocation;

    get tripType(): string {
        return Reflect.get(this, 'type') as string;
    }

    getUser<T extends string | number>(
        value: T,
        type: 'index' | 'userId' | 'name'
    ): User | null {
        switch (type) {
            case 'index':
                if (typeof value === 'number') {
                    return this.userLinks[value]?.user ?? null;
                }
                break;

            case 'userId':
                if (typeof value === 'string') {
                    return this.userLinks.find(link => link.user.userId === value)?.user ?? null;
                }
                break;

            case 'name':
                if (typeof value === 'string') {
                    return this.userLinks.find(link =>
                        link.user.name.toLowerCase() === value.toLowerCase()
                    )?.user ?? null;
                }
                break;
        }
        return null;
    }
}