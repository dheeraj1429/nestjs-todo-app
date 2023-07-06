import {
   Controller,
   Post,
   Headers,
   UnauthorizedException,
} from '@nestjs/common';
import { JwtTokenService } from './jwt-token.service';

@Controller('token')
export class JwtTokenController {
   constructor(private readonly JwtTokenService: JwtTokenService) {}

   @Post('refresh-token')
   async genrateAccessToken(@Headers() headers) {
      const authorization: string = headers['authorization'];
      if (!authorization) throw new UnauthorizedException();

      if (authorization) {
         const barer = authorization.split(' ')?.[1];
         const validateToken = await this.JwtTokenService.validateToken(
            barer,
            process.env.REFRESH_TOKEN_KEY,
         );

         if (
            validateToken &&
            validateToken?.isValidate &&
            validateToken?.payload
         ) {
            const token = await this.JwtTokenService.genrateAccessToken(
               { _id: validateToken.payload._id },
               '5m',
            );
            return {
               success: true,
               error: false,
               accessToken: token,
            };
         }
      }
   }
}
