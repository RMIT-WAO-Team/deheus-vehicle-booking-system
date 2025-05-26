import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Account {
    @PrimaryColumn()
    userId: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @OneToOne(() => User, (user) => user.account)
    @JoinColumn({ name: "userId" })
    user: User;
}
