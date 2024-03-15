import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compare, hashSync } from 'bcrypt';
import { HydratedDocument } from 'mongoose';

const HASH_ROUND = 10;

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    set: (password: string) => hashSync(password, HASH_ROUND),
  })
  password: string;

  async checkPassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);
