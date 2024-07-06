import { IRepositoryContract } from '@domain/contracts/repository.contract'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../schema/user.schema'
import { TFindUserResponse } from '@modules/user/app/types/find.type'
import { TFiltersRoot } from '@domain/core/filters.core'

export class UserRepository
  implements IRepositoryContract<User | TFiltersRoot, TFindUserResponse>
{
  constructor(
    @InjectModel(User.name)
    private readonly model: Model<User>
  ) {}

  async create(dto: User): Promise<boolean> {
    try {
      await new this.model(dto).save()
      return true
    } catch {
      return false
    }
  }

  async find(dto?: TFiltersRoot): Promise<TFindUserResponse> {
    const { filters, limit, page } = dto || { filters: [], limit: 10, page: 1 }
    const query = this.model.find()

    filters.forEach((filter) => {
      query.where(filter.field).equals(filter.value)
    })

    query.limit(limit).skip((page - 1) * limit)
    const users = await query.exec()
    const total = await this.model.countDocuments(query.getQuery()).exec()

    return { users, total }
  }

  async delete(dto: User): Promise<boolean> {
    try {
      await this.model.deleteOne({ _id: dto._id }).exec()
      return true
    } catch {
      return false
    }
  }
}
