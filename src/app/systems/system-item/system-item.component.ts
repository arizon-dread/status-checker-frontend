import { Component, DestroyRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { SystemStatusResponse } from '../models/system-status-response';
import { faCircleCheck, faCircleExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { SystemService } from '../services/system.service';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-system-item',
  templateUrl: './system-item.component.html',
  styleUrls: ['./system-item.component.css']
})
export class SystemItemComponent implements OnInit, OnDestroy, OnChanges {

  @Input() system!: SystemStatusResponse;
  faCircleCheck = faCircleCheck;
  class = 'text-success';
  title = 'System is up';
  displayDate = true;
  dateStyle = 'fst-italic';
  destroyRef = inject(DestroyRef)
  systemSub: Subscription | undefined;
  constructor(private systemSvc: SystemService, private datePipe: DatePipe) { }
  
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
  }

  ngOnDestroy(): void {
      if (this.systemSub) {
        this.systemSub.unsubscribe();
      }
  }
  poll() {
    if (this.system) {
      this.systemSvc.getSystem(this.system?.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (data: SystemStatusResponse) => {
          if (data) {
            this.system = data;
            this.setDisplayLastOKTime(data);
            this.updateStatusIcon();
          }
        },
        error: (err: Error) => {
          console.log("Error while polling: " + err.message);
        }      
      });
    }
    
  }
  openEditModal(system: SystemStatusResponse) {
    //open editModal with MatDialog

  }
  setDisplayLastOKTime(system: SystemStatusResponse) {
    console.log(system?.lastOkTime)
    if (system?.lastOkTime.includes("0001-01-01")) {
      this.displayDate = false;
    } else {
      this.displayDate = true;      
    }
  }

}
