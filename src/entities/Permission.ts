import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Permission {
    @PrimaryColumn()
    permissionId: string;

    @Column({
        type: "varchar",
        length: 255,
    })
    title: string;

    @Column({ type: "text" })
    description: string;
}