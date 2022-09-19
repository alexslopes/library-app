import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/student.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Usuario[] = [];
  studentSelecionado: Usuario;
  mensagemSucess: string;
  mensagemErro: string;
  totalElementos: number;
  pagina: number;

  constructor(
    private service: StudentService,
    private router: Router) {}

  ngOnInit(): void {
    this.listStudents();
  }

  novoCadastro() {
    this.router.navigate(['/student/form'])
  }

  preparaDelecao(student: Usuario) {
    this.studentSelecionado = student;
  }

  listStudents(pagina = 0, tamanho = 10){
    this.service.list(pagina, tamanho).subscribe(response =>  {
      console.log(response);
      this.students = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    })
  }

  deleteStudent() {
    this.service.delete(this.studentSelecionado).
    subscribe(
      response => {this.mensagemSucess = 'Aluno deletado com sucesso!'
      this.ngOnInit()
      },
      error => this.mensagemErro = 'Ocorreu um erro ao deletar o aluno')
  }


}
