import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './schemas/todo.schema';
import { TodoDto } from './dto/todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() todo: Todo): Promise<TodoDto> {
    return this.todosService.create(todo);
  }

  @Get()
  async findAll(): Promise<TodoDto[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TodoDto> {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() todo: Todo,
  ): Promise<Todo> {
    return this.todosService.update(id, todo);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.todosService.remove(id);
  }
}