import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Language } from 'src/app/model/language';
import { AdminLevelService } from 'src/app/service/admin-level.service';
import { LevelService } from 'src/app/service/level.service';
import { LanguageService } from 'src/app/service/language.service';
import { Level } from '../level';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-level-form',
  templateUrl: './level-form.component.html',
  styleUrls: ['./level-form.component.css']
})
export class LevelFormComponent implements OnInit {

  level: Level;
  success: boolean = false;
  errors: String[];
  id: number;
  languages: Language[];
  languageSelected: number;


  constructor(private levelService: LevelService,
    private adminService: AdminLevelService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService) {
    this.level = new Level();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.levelService.getBookById(this.id)
          .subscribe(
            response => this.level = response,
            errorresponse => this.level = new Level())
      }

      this.languageService.getAllLanguage()
        .subscribe(
          response => {
            this.languages = response;
            this.languageSelected = this.languages[0].id;
          }

        )

    })

    console.log(this.level.description)
  }

  voltarParaListagem() {
    this.router.navigate(['/level /lista'])
  }

  clicar() {
    console.log(this.level);
  }

  onSubmit() {
    this.level.languageId = this.languageSelected;
    console.log(this.languageSelected);

    if (this.id) {
      this.adminService.atualizar(this.level)
        .subscribe(response => {
          this.success = true;
          this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o módulo.']
        })
    } else {

      this.adminService.salvar(this.level).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.level = response;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        })
    }
  }

  htmlContent = "";

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

  print(event){
    console.log(event);
  }

}
