import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from "typeorm";

@Entity({ name: "posts" })
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @Column({ type: "text" })
  message!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" }) 
  createdAt!: Date;
}
