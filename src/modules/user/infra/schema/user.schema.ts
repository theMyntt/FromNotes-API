import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class User {
  @Prop({ type: String, required: true })
  _id: string

  @Prop({ type: String, required: true })
  fhsId: string

  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true })
  email: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({ type: String, required: true })
  phone: string

  @Prop({ type: Date, required: true })
  createdAt: Date

  @Prop({ default: Date.now, type: Date })
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
