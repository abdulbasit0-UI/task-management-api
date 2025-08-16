import { IsString, IsOptional, IsEnum, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../entities/task.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Task title', description: 'Task title' })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Task description',
    description: 'Task description',
    required: false,
  })
  
  description?: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  @ApiProperty({
    enum: TaskStatus,
    default: TaskStatus.open,
    required: false,
  })
  status?: TaskStatus;
}
