import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Note, NoteSchema } from './schema/note.schema'
import { NoteRepository } from './repositories/note.repository'
import { NoteMapper } from '../domain/mapper/note.mapper'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Note.name,
        schema: NoteSchema
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
    }
  ]
})
export class NoteModule {}
