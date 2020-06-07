import { NgModule } from '@angular/core';
import {MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'
import {MatDialogModule} from "@angular/material/dialog";
import{MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion'
import  {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule } from '@angular/material/toolbar'
@NgModule({
imports:[
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule
],
exports:[
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule
]
})
export class AngularModule{}
