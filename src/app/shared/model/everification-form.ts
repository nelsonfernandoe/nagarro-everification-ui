export interface EventSourceResponse {
  content: EventSource[]
  pageable: Pageable
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: Sort
  first: boolean
  numberOfElements: number
  empty: boolean
}

export interface EventSource {
  id: number
  businessKey: string
  priority: string
  sourceBu: string
  dcpReference: string
  accountName: string
  transactionCurrency: string
  transactionAmount: number
  lockedBy: string
  debitAccountNumber: string
  accountCurrency: string
  beneficiaryName: string
  custInfoMkr: string
  accountInfoMkr: string
  outcome: string
  extension: string
  contactPerson: string
  customerCalledOn: string
  comment: string
  createdBy: string
  createdOn: string
  updatedOn: string
  updatedBy: string
  status: string
}

export interface Pageable {
  sort: Sort
  offset: number
  pageSize: number
  pageNumber: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}
