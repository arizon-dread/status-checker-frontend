import { Component, DestroyRef, Inject, OnInit, inject } from '@angular/core';
import { SystemService } from './services/system.service';
import { SystemStatusResponse } from './models/system-status-response';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { ToastrType } from '../shared/enums/toastr-type';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.css']
})
export class SystemsComponent implements OnInit {

  destroyRef = inject(DestroyRef);
  matDialogRef: MatDialogRef<EditModalComponent>| undefined; 
  systemResps: SystemStatusResponse[] = [];
  faPlus = faPlus;

  constructor (private systemSvc: SystemService, 
               private errHandler: ErrorHandlerService,
               private dialog: MatDialog) {}
  ngOnInit() {
    const statusRespSub = this.systemSvc.getSystems().subscribe({
      next: (data: SystemStatusResponse[]) => {
        
        if (data) {
          this.systemResps = data;
        }
      },
      error: (err: Error) => {
        this.errHandler.displayMsgToUser("Couldn't get system status list from backend.", ToastrType.error);
      },
      complete: () => {
        statusRespSub.unsubscribe();
      }
    });
  } 
  addSystem() {
    this.matDialogRef = this.dialog.open(EditModalComponent, {
      hasBackdrop: true,
      height: 'fit-content',
      width: '80%',
      position: {
        left: '10%',
        top: '5%'
      },
      backdropClass: 'cdk-overlay-dark-backdrop',
      data: {}
    });

    this.matDialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:(data: SystemStatusResponse) => {
        if (data) {
          //closed with submit  
          this.systemSvc.saveSystem(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (data: SystemStatusResponse) => {
              this.systemResps?.push(data);
            }, 
            error: (err: HttpErrorResponse) => {
              console.log(err.message);
            }
          });
        }
      }
    });
    this.matDialogRef.backdropClick().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.matDialogRef?.close();
      }
    })
  }
}
