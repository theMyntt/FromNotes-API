import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schema/user.schema'
import { UserRepository } from './repositories/user.repository'
import { UserAggregate } from '../domain/aggregate/user.aggregate'
import { UserMapper } from '../domain/mapper/user.mapper'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [
    { provide: 'I_USER_AGGREGATE', useClass: UserAggregate },
    { provide: 'I_USER_MAPPER', useClass: UserMapper },
    { provide: 'I_USER_REPOSITORY', useClass: UserRepository }
  ]
})
export class UserModule {}
