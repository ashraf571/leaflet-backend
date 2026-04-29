import { Column } from "typeorm";

export class User {
    @Column({ type: 'varchar' })
    name!: string

    @Column({ type: 'varchar' })
    email!: string

    @Column({ type: 'varchar' })
    password!: string
}
