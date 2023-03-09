import { Component, OnInit } from '@angular/core';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PageBookService } from 'src/app/service/page-book.service';
import { ChapterPageBook } from '../chapter-page-book';
import { PageBook } from '../page-book';
import { PageBookPages } from '../page-book-pages';

@Component({
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.css']
})
export class BookEditorComponent implements OnInit {


  htmlContent: string = "";
  chapters: number[];
  chapterPageBook: ChapterPageBook;
  currentPage: PageBookPages = new PageBookPages();

  constructor(private service: PageBookService) { }

  ngOnInit(): void {

    this.selectTab(1);

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

  selectTab(chapter: number): void {
    console.log("Aba selecioanda");
    this.service.list(1, chapter, 0, 1).subscribe(
      response => {
        this.chapterPageBook = response;
        this.chapters = this.chapterPageBook.chapters;
        this.currentPage = this.chapterPageBook.pages;

        if(this.currentPage) {
          this.htmlContent = this.currentPage.content[0].content;
        }

      }
    )
  }

  saveContent(content: string, currentPage: PageBookPages): void{
    let pageBook = new PageBook();
    pageBook.bookId = currentPage.content[0].bookId;
    pageBook.chapter = currentPage.content[0].chapter;
    pageBook.content = content;
    pageBook.pageIndex = currentPage.content[0].pageIndex;
    pageBook.id = currentPage.content[0].id;

    if(pageBook.id){
      this.service.update(pageBook).subscribe(
        response => console.log(response)
      );

    } else {
      this.service.save(pageBook).subscribe(
        response => console.log(response)
      );
    }
  }

}
