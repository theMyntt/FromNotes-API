export interface IRepositoryContract<Input, Output> {
  create: (dto: Input) => Promise<boolean>
  find: (dto?: Input) => Promise<Output>
  delete: (dto: Input) => Promise<boolean>
}
