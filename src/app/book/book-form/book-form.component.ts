import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminBookService } from 'src/app/service/admin-book.service';
import { BookService } from 'src/app/service/book.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  book: Book;
  success: boolean = false;
  errors: String[];
  id: number;


  constructor(private bookService: BookService,
    private adminService: AdminBookService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.book = new Book();
  }

  ngOnInit(): void {
    // let params: Observable<Params> = this.activatedRoute.params;
    // params.subscribe(urlParams => {
    //   this.id = urlParams['id'];
    //   if (this.id) {
    //     this.bookService.getBookById(this.id)
    //       .subscribe(
    //         response => this.book = response,
    //         errorresponse => this.book = new Book())
    //   }

    // })

    // console.log(this.book.description)
  }

  voltarParaListagem() {
    this.router.navigate(['/book/lista'])
  }

  clicar() {
    console.log(this.book);
  }

  onSubmit() {
    let bookTosave = this.book;

    if (this.id) {
      this.adminService.atualizar(this.book)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o módulo.']
        })
    } else {

      this.adminService.salvar(bookTosave).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.book = response;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        })
    }
  }

}
