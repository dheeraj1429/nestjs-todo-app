import {
   Controller,
   Post,
   Body,
   Res,
   Req,
   UseGuards,
   Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dtos/auth.dto';
import { Response, Request } from 'express';
import { AuthGrard } from 'src/auth-guard/auth-guard.guard';

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

   @UseGuards(AuthGrard)
   @Get('/data')
   getData() {
      return {};
   }
}
