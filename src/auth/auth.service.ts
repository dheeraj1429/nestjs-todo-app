import { Injectable, HttpStatus, Inject } from '@nestjs/common';
import { AuthLoginDto } from './dtos/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';

@Injectable()
export class AuthService {
   constructor(
      @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
      @Inject(JwtTokenService)
      private readonly jwtTokenService: JwtTokenService,
   ) {}

   async singUp(data: AuthLoginDto, req: Request, res: Response) {
      // check the email is exists or not if the user email is exits then send the error message
      const isEmailExists = await this.authModel.findOne(
         { email: data?.email },
         { email: 1 },
      );

      if (isEmailExists)
         return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            error: true,
            message: 'Email already exists.',
         });

      const hashPassword = await bcrypt.hash(data?.password, 10);

      const createNewAccount = await this.authModel.create({
         email: data?.email,
         password: hashPassword,
      });

      if (createNewAccount) {
         const accessToken = await this.jwtTokenService.genrateAccessToken(
            { _id: createNewAccount?._id },
            '5m',
         );
         const refreshToken = await this.jwtTokenService.genrateRefreshToken(
            { _id: createNewAccount?._id },
            '1y',
         );

         return res.status(HttpStatus.CREATED).json({
            auth: createNewAccount,
            accessToken,
            refreshToken,
         });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
         success: false,
         error: true,
         message: 'Internal server error',
      });
   }

   async login(data: AuthLoginDto, req: Request, res: Response) {
      // find the user is exists or not.
      const isUserExists = await this.authModel.findOne(
         { email: data?.email },
         { email: 1 },
      );

      if (!isUserExists)
         return res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            error: false,
            message: 'User account is not found!',
            status: HttpStatus.BAD_REQUEST,
         });

      const accessToken = await this.jwtTokenService.genrateAccessToken(
         { _id: isUserExists?._id },
         '5m',
      );
      const refreshToken = await this.jwtTokenService.genrateRefreshToken(
         { _id: isUserExists?._id },
         '1y',
      );

      return res.status(HttpStatus.CREATED).json({
         auth: isUserExists,
         accessToken,
         refreshToken,
      });
   }
}
