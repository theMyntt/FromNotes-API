export type TFiltersRoot = {
  filters: Array<{
    field: string
    value: string
  }>
  limit: number
  page: number
}
