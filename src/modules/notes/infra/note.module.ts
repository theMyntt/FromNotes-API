import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Note, NoteSchema } from './schema/note.schema'
import { NoteRepository } from './repositories/note.repository'

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
      provide: 'I_NOTE_REPOSITORY',
      useClass: NoteRepository
    }
  ]
})
export class NoteModule {}
