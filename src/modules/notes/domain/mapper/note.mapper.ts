import { IMapperContract } from '@domain/contracts/mapper.contract'
import { Note } from '@modules/notes/infra/schema/note.schema'
import { NoteAggregate } from '../aggregate/note.aggregate'

export class NoteMapper implements IMapperContract<Note, NoteAggregate> {
  toDomain(dto: Note): NoteAggregate {
    return new NoteAggregate({
      id: dto._id,
      title: dto.title,
      text: dto.text,
      createdBy: dto.createdBy,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt
    })
  }

  toPersistance(dto: NoteAggregate): Note {
    return {
      _id: dto.id,
      title: dto.title,
      text: dto.text,
      createdBy: dto.createdBy,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt
    }
  }
}
