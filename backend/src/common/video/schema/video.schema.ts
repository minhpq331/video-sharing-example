import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserDocument } from '../../user/schema/user.schema';

export type VideoDocument = HydratedDocument<Video>;

@Schema({
  timestamps: true,
})
export class Video {
  _id: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  url: string;

  @Prop()
  embed_url: string;

  @Prop()
  thumbnail: string;

  @Prop()
  author_id: Types.ObjectId;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  author?: UserDocument;

  transform() {
    return {
      id: this._id.toHexString(),
      title: this.title,
      description: this.description,
      url: this.url,
      embed_url: this.embed_url,
      thumbnail: this.thumbnail,
      created_at: this.createdAt,
      author_id: this.author_id.toHexString(),
      author: this.author?.transform() || undefined,
    };
  }
}

export const VideoSchema = SchemaFactory.createForClass(Video);

VideoSchema.virtual('author', {
  ref: 'User',
  localField: 'author_id',
  foreignField: '_id',
  justOne: true,
});

VideoSchema.loadClass(Video);
