import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

export enum GameStatus {
  PENDING = "pending",
  WIN = "win",
  LOOSE = "loose",
  FAILED = "failed",
}

export enum GameCategory {
  PLAY = "play",
  BETTING = "betting",
  SURVIVAL = "survival",
  WINNING = "winning",
}

export class Game {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "decimal", precision: 10, scale: 4, default: "0.00" })
  amount!: number;

  @ManyToOne(() => User, (user) => user.investments)
  user!: User;

  @Column({ type: "varchar", length: 255 })
  gameName!: string;

  @Column({ type: "varchar", length: 255 })
  gameId!: string;

  @Column({ type: "varchar", length: 255 })
  verifyToken!: string;

  @Column({ type: "enum", enum: GameStatus, default: GameStatus.PENDING })
  status!: GameStatus;

  @Column({ type: "enum", enum: GameCategory, default: GameCategory.PLAY })
  category!: GameCategory;

  @Column({ type: "datetime" })
  gameStartedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
