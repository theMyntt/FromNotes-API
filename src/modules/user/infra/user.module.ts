import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schema/user.schema'
import { UserRepository } from './repositories/user.repository'
import { UserAggregate } from '../domain/aggregate/user.aggregate'
import { UserMapper } from '../domain/mapper/user.mapper'
import { UserSyncInUseCase } from '../app/usecases/sync-in.usecase'
import { UserService } from '../app/services/user.service'
import { UserSyncInController } from './controllers/sync-in.controller'

@Module({
  controllers: [UserSyncInController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [
    { provide: 'I_SYNC_IN_USECASE', useClass: UserSyncInUseCase },
    { provide: 'I_USER_MAPPER', useClass: UserMapper },
    { provide: 'I_USER_REPOSITORY', useClass: UserRepository },
    UserService
  ]
})
export class UserModule {}
