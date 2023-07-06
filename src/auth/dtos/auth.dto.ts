import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
   @IsString()
   @IsEmail()
   @IsNotEmpty()
   readonly email: string;

   @IsNotEmpty()
   @IsString()
   readonly password: string;
}
