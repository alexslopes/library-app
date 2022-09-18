import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  { path: 'student', component: LayoutComponent,
    canActivate: [AuthGuard], children: [
    { path: 'form' , component: StudentFormComponent},
    { path: 'form/:id' , component: StudentFormComponent},
    { path: 'lista' , component: StudentListComponent},
    { path: '' , redirectTo: '/student/lista', pathMatch: 'full'}
  ] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
