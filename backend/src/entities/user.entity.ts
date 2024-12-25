import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Investment } from './investment.entity';
import { EarningsHistory } from './earningHistory.entity';
import { Claim } from './claim.entity';
import { Withdrawal } from './withrawal.entity';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: true })
  wallet!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  referralCode!: string;

  @Column({ type: "decimal", precision: 10, scale: 4, default: "0.00" })
  balance!: number;

  @Column({ type: "decimal", precision: 10, scale: 4, default: "0.00" })
  gptBalance!: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  eligibilityLevel!: number;

  @Column({ type: "decimal", precision: 10, scale: 4, default: "0.00" })
  claimableROI!: number;

  @Column({ type: "decimal", precision: 10, scale: 4, default: "0.00" })
  claimableRef!: number;

  @OneToMany( () => Investment, (investment) => investment.investor, { nullable: true })
  investments!: Investment[];

  @ManyToOne(() => User, (user) => user.referredUsers, { nullable: true })
  referredBy!: User;

  @OneToMany(() => User, (user) => user.referredBy, { nullable: true })
  referredUsers!: User[];

  @Column()
  lastKnownIp!: string;

  @Column({ type: "enum", enum: ["admin", "user", "developer"], default: "user" })
  role!: "admin" | "user" | "developer";

  @Column({ default: "active" })
  status!: string;

  @Column({ default: false })
  hasActiveInvestment!: boolean;

  @OneToMany( () => EarningsHistory, (earningsHistory) => earningsHistory.user)
  earningsHistory!: EarningsHistory[];

  @OneToMany( () => Withdrawal, (withdrawalHistory) => withdrawalHistory.user )
  withdrawalHistory!: Withdrawal[];

  @OneToMany( () => Claim, (claim) => claim.user)
  claims!: Claim[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
