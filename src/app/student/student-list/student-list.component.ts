import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  studentSelecionado: Student;
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

  preparaDelecao(student: Student) {
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
    throw new Error('Method not implemented.');
    }


}
