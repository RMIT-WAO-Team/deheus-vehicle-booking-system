import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Photo {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
