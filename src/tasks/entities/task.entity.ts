import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum TaskStatus {
  open = "open",
  in_progress = "in_progress",
  done = "done",
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "enum", enum: TaskStatus, default: TaskStatus.open })
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
