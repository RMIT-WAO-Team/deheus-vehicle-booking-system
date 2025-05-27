import { Entity, Column, PrimaryColumn, OneToOne } from "typeorm";
import { Account } from "./Account";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @Column({ type: "varchar", length: 255 })
    profileImageUrl: string;

    @Column({ type: "varchar", length: 15, unique: true })
    phoneNumber: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @OneToOne(() => Account, (account) => account.user)
    account: Account;
}
