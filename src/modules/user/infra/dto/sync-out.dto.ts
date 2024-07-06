import { IsNotEmpty, IsString } from 'class-validator'

export class SyncOutUserDTO {
  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
