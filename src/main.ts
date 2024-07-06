import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { env } from './config/enviroment'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(env.NODE_PORT)

  Logger.log(`Application listening at ${env.NODE_PORT} port`)
}
bootstrap()
