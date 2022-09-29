import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminBookService } from 'src/app/admin-book.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  bookSelecionado: Book;
  mensagemSucess: string;
  mensagemErro: string;
  totalElementos: number;
  pagina: number;
  pageEvent: PageEvent;
  tamanho: number;

  constructor(
    private service: AdminBookService,
    private router: Router) {}

  ngOnInit(): void {
     this.listBooks();
  }

  novoCadastro() {
    this.router.navigate(['/book/form'])
  }

  preparaDelecao(book: Book) {
    this.bookSelecionado = book;
  }

  listBooks(pagina = 0, tamanho = 10){
    this.service.list(pagina, tamanho, 1).subscribe(response =>  {
      console.log(response);
      this.books = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
      this.tamanho = response.size;
    })
  }

  deleteBook() {
    this.service.delete(this.bookSelecionado).
    subscribe(
      response => {this.mensagemSucess = 'Módulo deletado com sucesso!'
      this.ngOnInit()
      },
      error => this.mensagemErro = 'Ocorreu um erro ao deletar o módulo')
  }

}
