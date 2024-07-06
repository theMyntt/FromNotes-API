import { IsNotEmpty, IsString } from 'class-validator'

export class SyncInNoteDTO {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  text: string

  @IsNotEmpty()
  @IsString()
  createdBy: string
}
