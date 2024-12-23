import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),TodosModule, MongooseModule.forRoot(`mongodb://${process.env.MONGO_DB_URI}`)],
  controllers: [],
  providers: [],
})
export class AppModule {}
