import { NodeWithI18n } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PageBookService } from 'src/app/service/page-book.service';
import { ChapterPageBook } from '../chapter-page-book';
import { PageBook } from '../page-book';
import { PageBookPages } from '../page-book-pages';

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
  chapterPageBook: ChapterPageBook;
  currentPage: PageBook = new PageBook();
  @Input('bookId') bookId: number;

  constructor(private service: PageBookService) { }

  ngOnInit(): void {

    this.service.getPageBook(1, 1, 0, 1).subscribe(
      response => {
        this.chapterPageBook = response;
        this.createTabs(this.chapterPageBook.chapters);
        this.currentPage =  this.chapterPageBook.pages.content[0];
        this.htmlContent =  this.currentPage?.content
      }
    )

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

  createTabs(chapters: number[]) {
    for(let chapter of chapters) {
      this.tabs.push({
        title: `Capítulo ${chapter}`,
        chapter: chapter,
        removable: true
      })
    }
  }

  addNewTab(chapter?: number) {
    let newTabIndex;
    if(chapter){
      newTabIndex = chapter;
    }
    newTabIndex = this.tabs.length + 1;

    this.tabs.push({
      title: `Capítulo ${newTabIndex}`,
      chapter: newTabIndex,
      removable: true
    })
  }

  removeTab(tab: ITab) {
    let index = this.tabs.indexOf(tab);

    if(index > -1) {
      this.tabs.splice(index, 1);
    }
  }

  selectTab(tab: ITab) {
    console.log(tab);
    this.service.getPagesByChapter(1, tab.chapter, 0, 1).subscribe(
      response => {
        if(response.content[0]){
          this.currentPage =  response.content[0];
          this.htmlContent = response.content[0]?.content;
        } else {
          this.currentPage = {
            id: null,
            bookId: 1, //trocar depois de testar
            chapter: tab.chapter,
            pageIndex: 1,
            content: ''
          }

          this.htmlContent = '';
        }




      }
    )
  }

  saveContent(content: string, currentPage: PageBook): void{
    let pageBook = new PageBook();
    pageBook.bookId = 1 //substituir depois
    pageBook.chapter = currentPage?.chapter;
    pageBook.content = content;
    pageBook.pageIndex = currentPage?.pageIndex;
    pageBook.id = currentPage?.id;

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
