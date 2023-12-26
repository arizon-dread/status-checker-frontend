import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import { SystemsRoutingModule } from './systems-routing.module';
import { SystemsComponent } from './systems.component';
import { SystemItemComponent } from './system-item/system-item.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SystemsComponent,
    SystemItemComponent,
    EditModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SystemsRoutingModule,
    FontAwesomeModule,
  ],
  providers: [
    DatePipe,
     {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ]
})
export class SystemsModule { }
