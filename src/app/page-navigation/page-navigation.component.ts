import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrls: ['./page-navigation.component.scss'],
})
export class PageNavigationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() hidePaginationNumbers = false;
  @Output() updateCurrentPage = new EventEmitter<number>();

  getRange(a: number): number[] {
    return Array.from({ length: a }, (_, index) => index + 1);
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCurrentPage.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateCurrentPage.emit(this.currentPage);
    }
  }
  selectPage(pagenumber: number) {
    this.currentPage = pagenumber;
    this.updateCurrentPage.emit(pagenumber);
  }
}
