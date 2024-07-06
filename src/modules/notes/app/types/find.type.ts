export type TFindNotesResponse = {
  notes: Array<TNotesResponse>
  total: number
}

export type TNotesResponse = {
  _id: string
  title: string
  text: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}
