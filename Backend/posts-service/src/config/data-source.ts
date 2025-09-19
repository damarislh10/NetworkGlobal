import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Post } from "../entity/Post";
import { Like } from "../entity/Like";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Post, Like], 
});
