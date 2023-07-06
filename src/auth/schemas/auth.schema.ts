import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
   @Prop({ unique: true, required: true })
   email: string;

   @Prop({ required: true })
   password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
