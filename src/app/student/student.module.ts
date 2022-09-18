import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentRoutingModule } from './student-routing.module';



@NgModule({
  declarations: [
    StudentFormComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ],
  exports: [
    StudentFormComponent,
    StudentListComponent
  ]
})
export class StudentModule { }
