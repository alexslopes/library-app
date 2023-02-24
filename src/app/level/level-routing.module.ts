import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { LevelFormComponent } from './level-form/level-form.component';
import { LevelListComponent } from './level-list/level-list.component';

const routes: Routes = [
  { path: 'level', component: LayoutComponent,
    canActivate: [AuthGuard], children: [
    { path: 'form' , component: LevelFormComponent},
    { path: 'form/:id' , component: LevelFormComponent},
    { path: 'lista' , component: LevelListComponent},
    { path: '' , redirectTo: '/level/lista', pathMatch: 'full'}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LevelRoutingModule { }
