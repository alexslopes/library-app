import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminStudentService } from 'src/app/admin-student.service';
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

  constructor( private studentService: StudentService,
               private adminService: AdminStudentService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) {
    this.student = new Usuario();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
      this.id = urlParams['id'];
      if(this.id) {
        this.studentService.getStudentById(this.id)
        .subscribe(
          response => this.student = response,
          errorresponse => this.student = new Usuario())
      }

    })

    console.log(this.student.name)
  }

  voltarParaListagem() {
    this.router.navigate(['/student/lista'])
  }

  clicar() {
    console.log(this.student);
  }

  onSubmit() {
    let studentTosave = this.student;
    studentTosave.rolesId = new Array<number>;
    studentTosave.rolesId.push(2);

    if(this.id) {
      this.adminService.atualizar(this.student)
      .subscribe( response =>
        {this.success = true;
        this.errors = null;
      }, errorResponse => {
        this.errors = [ 'Erro ao atualizar o usuário.']
      })
    } else {

    this.adminService.salvar(studentTosave).subscribe(
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
