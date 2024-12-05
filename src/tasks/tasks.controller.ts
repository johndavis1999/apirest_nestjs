import { Body, Controller, Get, Post, Patch , Delete, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
        
    }

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask( @Body() newTask: CreateTaskDto ) {
        this.tasksService.createTask(newTask.title, newTask.description);
        return this.tasksService.getAllTasks();
    }

    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() updatedFields: UpdateTaskDto ) {
        return this.tasksService.updateTask(id, updatedFields);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        this.tasksService.deleteTask(id);
        return this.tasksService.getAllTasks();
    }
}
