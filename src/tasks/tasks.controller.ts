import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/users/entities/user.entity";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";


@UseGuards(AuthGuard('jwt'))
@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@CurrentUser() user: User): Promise<Task[]> {
    return this.taskService.getTasks(user.id);
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@CurrentUser() user: User, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask({ ...createTaskDto, userId: user.id });
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
