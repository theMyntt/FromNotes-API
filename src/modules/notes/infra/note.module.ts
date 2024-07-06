import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Note, NoteSchema } from './schema/note.schema'
import { NoteRepository } from './repositories/note.repository'
import { NoteMapper } from '../domain/mapper/note.mapper'
import { User, UserSchema } from '@modules/user/infra/schema/user.schema'
import { UserRepository } from '@modules/user/infra/repositories/user.repository'
import { NotesSyncInUseCase } from '../app/usecases/sync-in.usecase'
import { NoteService } from '../app/services/note.service'
import { NotesSyncInController } from './controllers/sync-in.controller'
import { NotesSyncOutUseCase } from '../app/usecases/sync-out.usecase'
import { NotesSyncOutController } from './controllers/sync-out.controller'

@Module({
  controllers: [NotesSyncInController, NotesSyncOutController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Note.name,
        schema: NoteSchema
      },
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  providers: [
    {
      provide: 'I_SYNC_IN_USECASE',
      useClass: NotesSyncInUseCase
    },
    {
      provide: 'I_SYNC_OUT_USECASE',
      useClass: NotesSyncOutUseCase
    },
    {
      provide: 'I_NOTE_MAPPER',
      useClass: NoteMapper
    },
    {
      provide: 'I_NOTE_REPOSITORY',
      useClass: NoteRepository
    },
    {
      provide: 'I_USER_REPOSITORY',
      useClass: UserRepository
    },
    NoteService
  ]
})
export class NoteModule {}
