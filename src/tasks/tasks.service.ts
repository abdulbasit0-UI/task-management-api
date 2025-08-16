import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task, TaskStatus } from "./entities/task.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  async getTasks(): Promise<Task[]> {
    this.logger.log("Getting all tasks");
    const tasks = await this.taskRepository.find();
    this.logger.debug(`Found ${tasks.length} tasks`);
    return tasks;

  }

  async getTaskById(id: string): Promise<Task> {
    this.logger.log(`Getting task with id ${id}`);
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      this.logger.warn(`Task with id ${id} not found`);
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.open,
    });

    return this.taskRepository.save(task);
  }

  async updateTaskStatus(
    id: string,
    updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    const task = await this.getTaskById(id);

    Object.assign(task, updateTaskDto);

    return this.taskRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
