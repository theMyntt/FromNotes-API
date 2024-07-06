import { IRepositoryContract } from '@domain/contracts/repository.contract'
import { Note } from '../schema/note.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { TFiltersRoot } from '@domain/core/filters.core'
import {
  TFindNotesResponse,
  TNotesResponse
} from '@modules/notes/app/types/find.type'

export class NoteRepository
  implements IRepositoryContract<Note | TFiltersRoot, TFindNotesResponse>
{
  constructor(
    @InjectModel(Note.name)
    private readonly model: Model<Note>
  ) {}

  async create(dto: Note): Promise<boolean> {
    try {
      await new this.model(dto).save()
      return true
    } catch {
      return false
    }
  }
  async find(dto?: TFiltersRoot): Promise<TFindNotesResponse> {
    const { filters, limit, page } = dto || { filters: [], limit: 10, page: 1 }
    const query = this.model.find()

    filters.forEach((filter) => {
      query.where(filter.field).equals(filter.value)
    })

    query.limit(limit).skip((page - 1) * limit)
    const notes: Array<TNotesResponse> = await query.exec()
    const total = await this.model.countDocuments(query.getQuery()).exec()

    return { notes, total }
  }
  delete: (dto: Note) => Promise<boolean>
}
