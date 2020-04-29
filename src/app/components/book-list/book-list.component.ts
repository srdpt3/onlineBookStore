import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  currentCategoryId: number;
  searchMode: boolean;
  constructor(private bookService: BookService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    })
  }

  listBooks() {

    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
    console.log("hasCategoryId" + hasCategoryId);

    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    this.bookService.getBooks(this.currentCategoryId).subscribe(
      data => {

        data = this.books = data;

      })
      ;

  }
  handleSearchBooks() {
    const keyworkd: string = this._activatedRoute.snapshot.paramMap.get('keyword');
    this.bookService.searchBooks(keyworkd).subscribe(data => {
      this.books = data;
    })
  }

}
