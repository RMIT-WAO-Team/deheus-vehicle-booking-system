import {Column, Entity, JoinTable, ManyToMany, PrimaryColumn} from "typeorm";
import {Permission} from "./Permission";

@Entity()
export class Role {
    @PrimaryColumn()
    roleId: string;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @ManyToMany(() => Permission, {
        cascade: [ "insert", "update" ],
    })
    @JoinTable({
        name: "role_permission",
        joinColumn: { name: "role_id", referencedColumnName: "roleId" },
        inverseJoinColumn: { name: "permission_id", referencedColumnName: "permissionId" },
    })
    permissions: Permission[]
}