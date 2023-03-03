import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  NotImplementedException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks() {
    return this.taskService.findAllTasks();
  }

  @Get(':taskId')
  getTaskById(@Param('taskId') id: number) {
    const foundTask = this.taskService.findTaskById(id);
    if (!foundTask) throw new NotFoundException(`Task with Id ${id} not found`);

    return foundTask;
  }

  @Post('/create')
  addTask(@Body() taskDTO: TaskDTO) {
    return this.taskService.createTask(taskDTO);
  }

  @Put('/update/:taskId')
  updateTask(@Param('taskId') id: number, @Body() taskDTO: TaskDTO) {
    const foundTask = this.taskService.updateTask(id, taskDTO);
    if (!foundTask) throw new NotFoundException(`Task with Id ${id} not found`);

    return foundTask;
  }

  @Delete('/delete/:taskId')
  deleteTask(@Param('taskId') id: number) {
    const task = this.taskService.deleteTask(id);
    if (!task) throw new NotFoundException(`Task with Id ${id} not found`);

    return task;
  }

  @Put('/toggle/:taskId')
  toggleStatus(@Param('taskId') id: number) {
    const toggleTask = this.taskService.toggleStatus(id);
    if (!toggleTask)
      throw new NotFoundException(`Task with Id ${id} not found`);

    return toggleTask;
  }

  @Get('/export/file')
  exportFile() {
    return this.taskService.exportFile();
  }
}
