import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from './config/enviroment'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(env.NODE_PORT)

  Logger.log(`==== ${env.NODE_ENV} ====`)
  Logger.log(`Application listening at ${env.NODE_PORT} port`)
  Logger.log(
    `MongoDB connected at ${env.MONGO.URI}:${env.MONGO.PORT}/fromnotes_db`
  )
}
bootstrap()
