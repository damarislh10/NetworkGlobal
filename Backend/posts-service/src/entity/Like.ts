import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique, Index } from "typeorm";

@Entity({ name: "likes" })
@Unique(["postId", "userId"])
export class Like {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @Column({ name: "post_id", type: "uuid" })
  postId!: string;

  @Index()
  @Column({ name: "user_id", type: "uuid" }) 
  userId!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;
}
