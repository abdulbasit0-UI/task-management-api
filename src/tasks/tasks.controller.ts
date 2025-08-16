import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Put("/:id")
  updateTaskStatus(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, updateTaskDto);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
