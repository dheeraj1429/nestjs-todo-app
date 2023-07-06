import {
   Injectable,
   CanActivate,
   ExecutionContext,
   UnauthorizedException,
} from '@nestjs/common';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';

@Injectable()
export class AuthGrard implements CanActivate {
   constructor(private readonly jwtTokenService: JwtTokenService) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();
      const authorization: string = request.headers['authorization'];
      if (!authorization) throw new UnauthorizedException();

      if (authorization) {
         const barer = authorization.split(' ')?.[1];
         const validateToken = await this.jwtTokenService.validateToken(barer);
         if (validateToken) return true;
      }

      return false;
   }
}
