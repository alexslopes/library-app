import { NodeWithI18n } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BookService } from 'src/app/service/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book';

interface ITab {
  title: string;
  chapter?: number;
  content?: string;
  removable: boolean;
  active?: boolean;
  customClass?: string;
}

@Component({
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.css']
})
export class BookEditorComponent implements OnInit {


  htmlContent: string = "";
  chapters: number[];
  tabs: ITab[] = new Array;
  book: Book = new Book();
  leveiId: number;
  success: boolean = false;
  errors: String[];

  constructor(
    private route: ActivatedRoute,  
    private service: BookService
    ) { }

  ngOnInit(): void {

    this.getLevel();
  }
  getLevel(): void {
    this.leveiId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getBookByLevelId(this.leveiId).subscribe( book => {
      if(book){
      this.book = book;
      this.htmlContent = book.content}
    });
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };


  saveContent(content: string): void{
    let book = new Book();
    book.id = this.book.id
    book.content = this.htmlContent;
    book.levelId = this.leveiId;

    if(book.id){
      this.service.update(book).subscribe(
        response => {
          this.success = true;
          this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o livro.']
        }
      );

    } else {
      this.service.save(book).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }

}
