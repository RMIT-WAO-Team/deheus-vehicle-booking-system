import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Trip} from "./Trip";
import {User} from "./User";

@Entity()
export class TripFeedback {
    @PrimaryColumn()
    feedbackId: number;

    @Column({ type: 'decimal', precision: 2, scale: 1 })
    rating: number;

    @Column({ type: 'text'})
    comment: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @ManyToOne(() => Trip, (trip) => trip.feedbacks)
    @JoinColumn({ name: "tripId" })
    trip: Trip;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;
}