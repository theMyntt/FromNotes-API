import { IRepositoryContract } from '@domain/contracts/repository.contract'
import { Note } from '@modules/notes/infra/schema/note.schema'
import { TFindNotesResponse } from '../types/find.type'
import { Inject } from '@nestjs/common'
import { NoteRepository } from '@modules/notes/infra/repositories/note.repository'
import { UserRepository } from '@modules/user/infra/repositories/user.repository'
import { NotFoundError } from '@errors/notfound.error'
import { TFiltersRoot } from '@domain/core/filters.core'

export class NoteService
  implements IRepositoryContract<Note | TFiltersRoot, TFindNotesResponse>
{
  constructor(
    @Inject('I_NOTE_REPOSITORY')
    private readonly repository: NoteRepository,
    @Inject('I_USER_REPOSITORY')
    private readonly userRepository: UserRepository
  ) {}

  async create(dto: Note): Promise<boolean> {
    const user = await this.userRepository.find({
      filters: [
        {
          field: '_id',
          value: dto.createdBy
        }
      ],
      limit: 1,
      page: 1
    })

    if (!user.users[0]) {
      throw new NotFoundError('user with this id')
    }

    return await this.repository.create(dto)
  }
  async find(dto?: TFiltersRoot): Promise<TFindNotesResponse> {
    const { filters, limit, page } = dto || { filters: [], limit: 10, page: 1 }
    const { notes, total } = await this.repository.find({
      filters,
      limit,
      page
    })

    return { notes, total }
  }
  delete: (dto: Note) => Promise<boolean>
}
