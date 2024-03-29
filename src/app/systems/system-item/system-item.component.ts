import { Component, DestroyRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { SystemStatusResponse } from '../models/system-status-response';
import { faCircleCheck, faCircleExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { SystemService } from '../services/system.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-system-item',
  templateUrl: './system-item.component.html',
  styleUrls: ['./system-item.component.css']
})
export class SystemItemComponent implements OnInit, OnChanges {

  @Input() system!: SystemStatusResponse;
  faCircleCheck = faCircleCheck;
  certStatusText = 'valid';
  faCertStatus = faCircleCheck;
  certStatusClass = 'text-success';
  class = 'text-success';
  title = 'System is up';
  loading = false;
  displayOkDate = true;
  displayFailDate = true;
  dateStyle = 'fst-italic';
  destroyRef = inject(DestroyRef)
  matDialogRef: MatDialogRef<EditModalComponent> | undefined;
  constructor(private systemSvc: SystemService, private datePipe: DatePipe, private dialog: MatDialog) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['system'].currentValue && changes['system'].currentValue != changes['system'].previousValue) {
      this.system = changes['system'].currentValue;
    }
  }

  ngOnInit(): void {
    this.updateStatusIcon();
    this.setDisplayLastOKTime(this.system);
    
  }
  updateStatusIcon(): void {
     if (this.system?.status === '') {
      this.class = 'text-warning';
      this.faCircleCheck = faCircleExclamation;
      this.title = 'It seems this system has never been polled.'
    } else if (this.system?.status !== 'OK') {
      this.class = 'text-danger';
      this.faCircleCheck = faCircleXmark;
      this.title = 'The last poll was deemed unsuccessful'
    } else if (this.system?.status === 'OK') {
      this.class = 'text-success';
      this.faCircleCheck = faCircleCheck;
      this.title = 'System is up';
    }
    if (this.system?.certStatus === 'OK') {
      this.faCertStatus = faCircleCheck;
      this.certStatusText = 'Valid';
      this.certStatusClass = 'text-success';
    } else if (this.system?.certStatus === '')  {
      this.faCertStatus = faCircleExclamation;
      this.certStatusText = 'Insecure scheme';
      this.certStatusClass = 'text-secondary';
    } else {
      this.faCertStatus = faCircleXmark;
      this.certStatusText = 'Invalid';
      this.certStatusClass = 'text-danger';
    }
  }

  
  poll(event: Event) {
    event.stopPropagation();
    this.loading = true;
    if (this.system) {
      this.systemSvc.getSystem(this.system?.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (data: SystemStatusResponse) => {
          if (data) {
            this.loading = false;
            this.system = data;
            this.setDisplayLastOKTime(data);
            this.updateStatusIcon();
          }
        },
        error: (err: Error) => {
          this.loading = false;
          console.log("Error while polling: " + err.message);
        }      
      });
    }
    
  }
  openEditModal(system: SystemStatusResponse) {
    //open editModal with MatDialog

    this.matDialogRef = this.dialog.open(EditModalComponent, {
      hasBackdrop: true,
      height: 'fit-content',
      width: '80%',
      position: {
        left: '10%',
        top: '5%'
      },
      backdropClass: 'cdk-overlay-dark-backdrop',
      data: this.system
    });

    this.matDialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next:(data: SystemStatusResponse) => {
        if (data) {
          //closed with submit  
          //TODO: This creates a new system instead of updating.
          this.systemSvc.saveSystem(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (data: SystemStatusResponse) => {
              this.system = data;
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
  setDisplayLastOKTime(system: SystemStatusResponse) {
    
    if (this.system?.lastOkTime.includes("0001-01-01")) {
      this.displayOkDate = false;
    } else {
      this.displayOkDate = true;      
    }
    if (this.system?.lastFailTime.includes("0001-01-01")) {
      this.displayFailDate = false;
    } else {
      this.displayOkDate = true;
    }
  }
  
}
