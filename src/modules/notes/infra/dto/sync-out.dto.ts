import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class SyncOutNoteDTO {
  @IsNotEmpty()
  @IsString()
  user: string

  @IsNotEmpty()
  @IsString()
  limit: string

  @IsNotEmpty()
  @IsString()
  page: string
}
