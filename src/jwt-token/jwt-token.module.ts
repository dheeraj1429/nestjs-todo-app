import { Module } from '@nestjs/common';
import { JwtTokenController } from './jwt-token.controller';
import { JwtTokenService } from './jwt-token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [JwtModule],

   controllers: [JwtTokenController],

   providers: [JwtTokenService],

   exports: [JwtTokenService],
})
export class jwtTokenModel {}
