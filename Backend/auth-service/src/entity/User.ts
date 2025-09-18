import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 50 })
  firstName!: string;

  @Column({ type: "varchar", length: 50 })
  lastName!: string;

  @Column({ type: "date", nullable: true })
  birthDate!: Date | null;

  @Column({ type: "varchar", unique: true })
  alias!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;
}
