import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "./User";

export enum ActionType {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
    ASSIGN = "assign",
    APPROVE = "approve",
    LOGIN = "login",
    ERROR = "error",
    LOGOUT = "logout",
    SYSTEM = "system",
}

@Entity()
export class Log {
    @PrimaryColumn()
    logId: string;

    @Column({
        type: 'enum',
        enum: ActionType,
    })
    actionType: ActionType;

    @Column({ type: 'varchar', length: 255 })
    entityId: string;

    @Column({ type: 'text'})
    actionDescription: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;
}