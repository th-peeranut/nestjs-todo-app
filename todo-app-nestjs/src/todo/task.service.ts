import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { TaskModel } from './task.model';
import { todos } from './todos-mock';

@Injectable()
export class TaskService {

    _tasks: TaskModel[] = todos;

    findAllTasks(): TaskModel[] {
        return this._tasks;
    }

    findTaskById(id: number): TaskModel {
        return this._tasks.find(i => i.id == id);
    }

    findTaskIndex(id: number): number {
        return this._tasks.findIndex(i => i.id == id);
    }

    createTask(newTask: TaskDTO): TaskModel[] {
        const lastTaskId = this._tasks[this._tasks.length - 1].id;
        const newTaskId = lastTaskId + 1;
        newTask.id = newTaskId;
        newTask.is_complete = false;
        this._tasks.push(newTask);

        return this._tasks;
    }

    updateTask(id: number, taskDTO: TaskDTO): TaskModel[] {
        const index = this.findTaskIndex(id);
        this._tasks[index].name = taskDTO.name;

        return this._tasks;
    }

    deleteTask(id: number): TaskModel[] {
        const index = this.findTaskIndex(id);
        this._tasks.splice(index, 1);

        return this._tasks;
    }

    toggleStatus(id: number): TaskModel[] {
        const index = this.findTaskIndex(id);
        this._tasks[index].is_complete = !this._tasks[index].is_complete;

        return this._tasks;
    }

    exportFile() {
        const fs = require('fs');
        const data = JSON.stringify(this._tasks);
        try {
            fs.writeFileSync('myFile.txt', data, 'utf-8');
        } catch (e) {
            console.log(e)
        }
    }
}
