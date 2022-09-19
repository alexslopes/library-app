import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/student.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  student: Usuario;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor( private service: StudentService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) {
    this.student = new Usuario();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
      this.id = urlParams['id'];
      if(this.id) {
        this.service.getStudentById(this.id)
        .subscribe(
          response => this.student = response,
          errorresponse => this.student = new Usuario())
      }

    })

    this.student.roleId = 2;

    console.log(this.student.name)
  }

  voltarParaListagem() {
    this.router.navigate(['/student/lista'])
  }

  clicar() {
    console.log(this.student);
  }

  onSubmit() {
    if(this.id) {
      this.service.atualizar(this.student)
      .subscribe( response =>
        {this.success = true;
        this.errors = null;
      }, errorResponse => {
        this.errors = [ 'Erro ao atualizar o usuário.']
      })
    } else {

    this.service.salvar(this.student).subscribe(
      (response) => { this.success = true;
        this.errors = null;
        this.student = response;
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })
  }
}


}
