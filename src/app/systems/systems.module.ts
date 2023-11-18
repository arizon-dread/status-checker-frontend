import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemsRoutingModule } from './systems-routing.module';
import { SystemsComponent } from './systems.component';
import { SystemItemComponent } from './system-item/system-item.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    SystemsComponent,
    SystemItemComponent,
    EditModalComponent,
  ],
  imports: [
    CommonModule,
    SystemsRoutingModule,
    FontAwesomeModule,
  ]
})
export class SystemsModule { }
