import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type VideoDocument = HydratedDocument<Video>;

@Schema({
  timestamps: true,
})
export class Video {
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
}

export const VideoSchema = SchemaFactory.createForClass(Video);

VideoSchema.loadClass(Video);
