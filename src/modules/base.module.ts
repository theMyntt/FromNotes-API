import { env } from '@config/enviroment'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot(`${env.MONGO.URI}:${env.MONGO.PORT}/fromnotes_db`)
  ]
})
export class BaseModule {}
