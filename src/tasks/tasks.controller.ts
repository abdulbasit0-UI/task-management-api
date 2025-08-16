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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";


@ApiTags('Tasks')
@ApiBearerAuth('access_token')
@UseGuards(AuthGuard('jwt'))
@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks for the current user' })
  @ApiResponse({ status: 200, description: 'Returns an array of tasks', type: [Task] })
  getAllTasks(@CurrentUser() user: User): Promise<Task[]> {
    return this.taskService.getTasks(user.id);
  }

  @Get("/:id")
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiParam({ name: 'id', type: 'string', description: 'Task id' })
  @ApiResponse({ status: 200, description: 'Returns a task', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found' })
  getTaskById(@Param("id") id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Returns the created task', type: Task })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  createTask(@CurrentUser() user: User, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask({ ...createTaskDto, userId: user.id });
  }

  @Put("/:id")
  @ApiOperation({ summary: 'Update a task status' })
  @ApiParam({ name: 'id', type: 'string', description: 'Task id' })
  @ApiResponse({ status: 200, description: 'Returns the updated task', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found' })
  updateTaskStatus(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, updateTaskDto);
  }

  @Delete("/:id")
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', type: 'string', description: 'Task id' })
  @ApiResponse({ status: 204, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  deleteTask(@Param("id") id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
