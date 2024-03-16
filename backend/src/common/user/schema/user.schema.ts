import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compare, hashSync } from 'bcrypt';
import { HydratedDocument, Types } from 'mongoose';

const HASH_ROUND = 10;

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  _id: Types.ObjectId;

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

  transform() {
    return {
      id: this._id.toHexString(),
      email: this.email,
    };
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);
