import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelRoutingModule } from './level-routing.module';
import { LevelListComponent } from './level-list/level-list.component';
import { LevelFormComponent } from './level-form/level-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    LevelListComponent,
    LevelFormComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    LevelRoutingModule,
    MatSelectModule,
    BrowserAnimationsModule,
    AngularEditorModule,
    NgSelectModule
  ]
})
export class LevelModule { }
