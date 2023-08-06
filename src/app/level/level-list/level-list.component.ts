import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminLevelService } from 'src/app/service/admin-level.service';
import { Level } from '../level';
import { LevelService } from 'src/app/service/level.service';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})
export class LevelListComponent implements OnInit {

  levels: Level[] = [];
  bookSelecionado: Level;
  mensagemSucess: string;
  mensagemErro: string;
  totalElementos: number;
  pagina: number;
  pageEvent: PageEvent;
  tamanho: number;

  constructor(
    private serviceAdmin: AdminLevelService,
    private service: LevelService,
    private router: Router) {}

  ngOnInit(): void {
     this.listBooks();
  }

  novoCadastro() {
    this.router.navigate(['/level/form'])
  }

  preparaDelecao(level: Level) {
    this.bookSelecionado = level;
  }

  listBooks(pagina = 0, tamanho = 10){
    this.service.list(pagina, tamanho, 1).subscribe(response =>  {
      console.log(response);
      this.levels = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
      this.tamanho = response.size;
    })
  }

  deleteBook() {
    this.serviceAdmin.delete(this.bookSelecionado).
    subscribe(
      response => {this.mensagemSucess = 'Módulo deletado com sucesso!'
      this.ngOnInit()
      },
      error => this.mensagemErro = 'Ocorreu um erro ao deletar o módulo')
  }

}
