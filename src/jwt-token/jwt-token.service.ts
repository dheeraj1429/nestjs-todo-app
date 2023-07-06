import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
   constructor(private readonly jwtService: JwtService) {}

   async genrateAccessToken(payload: any, expireTime: string): Promise<string> {
      const token = await this.jwtService.sign(payload, {
         expiresIn: expireTime,
         secret: process.env.ACCESS_TOKEN_KEY,
      });
      return token;
   }

   async genrateRefreshToken(
      payload: any,
      expireTime: string,
   ): Promise<string> {
      const token = await this.jwtService.sign(payload, {
         expiresIn: expireTime,
         secret: process.env.REFRESH_TOKEN_KEY,
      });
      return token;
   }

   validateToken(
      token: string,
      secret: string = process.env.ACCESS_TOKEN_KEY,
   ): { isValidate: boolean; payload: any } {
      try {
         const payload = this.jwtService.verify(token, { secret });
         if (payload) {
            return { isValidate: true, payload };
         }
         return { isValidate: false, payload: null };
      } catch (err) {
         throw new UnauthorizedException();
      }
   }
}
