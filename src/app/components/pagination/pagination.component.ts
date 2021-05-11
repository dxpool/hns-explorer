import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() page: number;
  @Input() total: number;
  @Input() pageSize: number;
  @Input() changePage: Function;

  pagination = [];
  max = 1;

  constructor() { }

  ngOnChanges(): void {
    this.handlePagination();
  }

  handlePagination() {
    const max = Math.ceil(this.total / this.pageSize);
    this.max = max;
    const page = this.page / 1;

    this.pagination = [];

    // 生成三个数组，比较首尾部分
    const pageSet = new Set([1, 2, 3, page - 1, page, page + 1, max - 2, max - 1, max]);

    const pageIndex = Array.from(pageSet).sort((a, b) => { return a - b });
    for (let i = 0; i < pageIndex.length; i++) {
      if (pageIndex[i] <= 0 || pageIndex[i] > max) {
        continue;
      }

      if (pageIndex[i - 1] && pageIndex[i - 1] + 1 < pageIndex[i]) {
        this.pagination.push(this.getPageItem(-1))
      }

      this.pagination.push(this.getPageItem(pageIndex[i]));
    }
  }

  getPageItem(page: number) {
    let display = page.toString();
    let inactive = this.page == page;

    if (page === -1) {
      display = '...';
      inactive = true;
    }

    return { display, inactive, page };
  }
}
