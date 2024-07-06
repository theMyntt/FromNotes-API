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
  find: (dto?: TFiltersRoot) => Promise<TFindUserResponse>
  delete: (dto: User) => Promise<boolean>
}
