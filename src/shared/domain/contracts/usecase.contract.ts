export interface IUseCaseContract<Input, Output> {
  run(dto: Input): Promise<Output>
}
