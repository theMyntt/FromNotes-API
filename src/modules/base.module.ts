import { env } from '@config/enviroment'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/infra/user.module'

@Module({
  imports: [
    MongooseModule.forRoot(`${env.MONGO.URI}:${env.MONGO.PORT}/fromnotes_db`),
    UserModule
  ]
})
export class BaseModule {}
