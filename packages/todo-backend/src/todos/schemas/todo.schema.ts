import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;


  @Prop({ required: true, enum: ['TODO', 'IN_PROGRESS', 'DONE'] })
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

export const TodoSchema = SchemaFactory.createForClass(Todo);