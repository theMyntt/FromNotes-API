import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Note {
  @Prop({ type: String, required: true })
  _id: string

  @Prop({ type: String, required: true })
  title: string

  @Prop({ type: String, required: true })
  text: string

  @Prop({ type: String, required: true })
  createdBy: string

  @Prop({ type: Date, required: true })
  createdAt: Date

  @Prop({ default: Date.now, type: Date })
  updatedAt: Date
}

export const NoteSchema = SchemaFactory.createForClass(Note)
