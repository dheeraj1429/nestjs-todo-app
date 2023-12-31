import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtTokenModel } from './jwt-token/jwt-token.module';
import { TodoModule } from './todo/todo.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: ['.env.development'],
         isGlobal: true,
      }),

      AuthModule,

      MongooseModule.forRoot(process.env.MONGODB_URI),

      jwtTokenModel,

      TodoModule,
   ],

   controllers: [],

   providers: [],

   exports: [],
})
export class AppModule {}
