import { IRepositoryContract } from '@domain/contracts/repository.contract'
import { TFiltersRoot } from '@domain/core/filters.core'
import { TFindUserResponse } from '../types/find.type'
import { Inject } from '@nestjs/common'
import { UserRepository } from '@modules/user/infra/repositories/user.repository'
import { User } from '@modules/user/infra/schema/user.schema'
import { ConflictError } from '@errors/conflict.error'

export class UserService
  implements IRepositoryContract<User | TFiltersRoot, TFindUserResponse>
{
  constructor(
    @Inject('I_USER_REPOSITORY')
    private readonly repository: UserRepository
  ) {}

  async create(dto: User): Promise<boolean> {
    const user = await this.repository.find({
      filters: [
        { field: 'email', value: dto.email },
        { field: 'phone', value: dto.phone }
      ],
      limit: 1,
      page: 1
    })

    if (user.users[0]) {
      throw new ConflictError('user')
    }

    this.repository.create(dto)

    return true
  }

  async find(dto?: TFiltersRoot): Promise<TFindUserResponse> {
    const { filters, limit, page } = dto || { filters: [], limit: 10, page: 1 }
    const { users, total } = await this.repository.find({
      filters,
      limit,
      page
    })

    return { users, total }
  }

  delete: (dto: User) => Promise<boolean>
}
