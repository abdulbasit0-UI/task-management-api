import { IsString, IsOptional, IsEnum } from "class-validator";
import { TaskStatus } from "../entities/task.entity";

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
