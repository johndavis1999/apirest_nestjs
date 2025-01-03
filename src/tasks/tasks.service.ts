import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [{
        id: '1',
        title: 'first task',
        description: 'some task',
        status: TaskStatus.PENDING,
    }];

    getAllTasks() {
        return this.tasks;
    }
    
    createTask(title: string, description: string) {
        const task = {
            id: v4(),
            title,
            description,
            status: TaskStatus.PENDING
        }

        this.tasks.push(task);

        return task;
    }

    showTask(id: string) {
        return this.tasks.find(task => task.id === id);
    }
    
    updateTask(id: string, updatedFields: UpdateTaskDto): Task {
        const task = this.showTask(id);
        const newTask = Object.assign(task, updatedFields);
        this.tasks = this.tasks.map(task => task.id === id ? newTask : task); 
        return newTask;
    }
    
    deleteTask(id: string) {
        this. tasks = this.tasks.filter(task => task.id !== id );
    }
    
}
