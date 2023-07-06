import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { jwtTokenModel } from 'src/jwt-token/jwt-token.module';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),

      jwtTokenModel,
   ],

   controllers: [AuthController],

   providers: [AuthService],

   exports: [],
})
export class AuthModule {}
