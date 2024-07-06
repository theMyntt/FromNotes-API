import { IRepositoryContract } from '@domain/contracts/repository.contract'
import { Note } from '@modules/notes/infra/schema/note.schema'
import { TFindNotesResponse } from '../types/find.type'
import { Inject } from '@nestjs/common'
import { NoteRepository } from '@modules/notes/infra/repositories/note.repository'

export class NoteService
  implements IRepositoryContract<Note, TFindNotesResponse>
{
  constructor(
    @Inject('I_NOTE_REPOSITORY')
    private readonly repository: NoteRepository
  ) {}

  async create(dto: Note): Promise<boolean> {
    return await this.repository.create(dto)
  }
  find: (dto?: Note) => Promise<TFindNotesResponse>
  delete: (dto: Note) => Promise<boolean>
}
