export interface EverificationResponse {
  everifications: Everification[]
}

export interface Everification {
  id: number
  businessKey: string
  priority: string
  sourceBu: string
  dcpReference: string
  accountName: string
  transactionCurrency: string
  transactionAmount: number
  lockedBy: string
  createdOn: string
}
