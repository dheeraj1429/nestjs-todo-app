import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dtos/auth.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('/signup')
   singUp(@Body() Body, @Req() req: Request, @Res() res: Response) {
      return this.authService.singUp(Body, req, res);
   }

   @Post('/login')
   login(
      @Body() body: AuthLoginDto,
      @Req() req: Request,
      @Res() res: Response,
   ) {
      return this.authService.login(body, req, res);
   }
}
