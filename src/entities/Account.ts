import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import {Exclude, Expose} from "class-transformer";

@Entity()
@Exclude()
export class Account {
    @PrimaryColumn()
    @Expose()
    userId: string;

    @Column({ type: 'varchar', length: 255 })
    @Expose()
    username: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @OneToOne(() => User, (user) => user.account)
    @JoinColumn({ name: "userId" })
    user: User;
}
