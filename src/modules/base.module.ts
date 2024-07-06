import { env } from '@config/enviroment'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/infra/user.module'
import { NoteModule } from './notes/infra/note.module'

@Module({
  imports: [
    MongooseModule.forRoot(`${env.MONGO.URI}:${env.MONGO.PORT}/fromnotes_db`),
    UserModule,
    NoteModule
  ]
})
export class BaseModule {}
