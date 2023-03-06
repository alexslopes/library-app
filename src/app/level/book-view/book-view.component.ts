import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {

  content: string;


  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    let param = Number(routeParams.get('id'));
     this.bookService.getBookById(param).subscribe(
      response => {
        //this.content = response.content
      }
     );
  }

}
