export class PaginationModel implements Pagination {
  pageIndex: number = 0
  perPage: number = 10
  totalCount: number = 0

  constructor(props?: Pagination) {
    if (props) {
      this.pageIndex = props.pageIndex
      this.perPage = props.perPage
      this.totalCount = props.totalCount
    }
  }
}

export interface Pagination {
  pageIndex: number
  perPage: number
  totalCount: number
}
