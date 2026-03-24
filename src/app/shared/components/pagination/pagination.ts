import { Component, computed, input, output, ChangeDetectionStrategy } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';




@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination {

  /*pages = input(0);
  currentPage = input<number>(1);

  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });*/

  totalRecords = input(0);
  rows = input(10);
  currentPage = input(1);

  pageChange = output<number>();

  first = computed(() => (this.currentPage() - 1) * this.rows());

  onPageChange(event: any) {
    const page = (event.first / event.rows) + 1;
    this.pageChange.emit(page);
  }
}
