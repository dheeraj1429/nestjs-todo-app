import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
   imports: [],

   providers: [TodoService],

   controllers: [TodoController],

   exports: [],
})
export class TodoModule {}
