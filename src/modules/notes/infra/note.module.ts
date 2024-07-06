import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Note, NoteSchema } from './schema/note.schema'
import { NoteRepository } from './repositories/note.repository'
import { NoteMapper } from '../domain/mapper/note.mapper'
import { User, UserSchema } from '@modules/user/infra/schema/user.schema'
import { UserRepository } from '@modules/user/infra/repositories/user.repository'

@Module({
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
    }
  ]
})
export class NoteModule {}
