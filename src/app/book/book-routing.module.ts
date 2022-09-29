import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
  { path: 'book', component: LayoutComponent,
    canActivate: [AuthGuard], children: [
    { path: 'form' , component: BookFormComponent},
    { path: 'form/:id' , component: BookFormComponent},
    { path: 'lista' , component: BookListComponent},
    { path: '' , redirectTo: '/book/lista', pathMatch: 'full'}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
