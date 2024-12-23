import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { maptoDto } from './todos.mapper';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(todo: Todo): Promise<TodoDto> {
    const todoMod = new this.todoModel({ ...todo, status: 'TODO' });

    return maptoDto(await todoMod.save());
  }

  async findAll(): Promise<TodoDto[]> {
    return (await this.todoModel.find().exec()).map(maptoDto);
  }

  async findOne(id: string): Promise<TodoDto> {
    return maptoDto(await this.todoModel.findById(id).exec());
  }

  async update(id: string, todo: Todo): Promise<TodoDto> {
    return maptoDto(await this.todoModel.findByIdAndUpdate(id, {...todo }, { new: true }).exec());
  }

  async remove(id: string): Promise<void> {
    await this.todoModel.findByIdAndDelete(id).exec();
  }
}