import { Component, DestroyRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { SystemStatusResponse } from '../models/system-status-response';
import { faCircleCheck, faCircleExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { SystemService } from '../services/system.service';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-system-item',
  templateUrl: './system-item.component.html',
  styleUrls: ['./system-item.component.css']
})
export class SystemItemComponent implements OnInit, OnDestroy {

  @Input() system: SystemStatusResponse | undefined;
  faCircleCheck = faCircleCheck;
  class = 'text-success';
  title = 'System is up';
  dateOrNeverCalled = "Never polled";
  dateStyle = 'fst-italic';
  destroyRef = inject(DestroyRef)
  systemSub: Subscription | undefined;
  constructor(private systemSvc: SystemService) { }

  ngOnInit(): void {
    if (this.system?.status === '') {
      this.class = 'text-warning';
      this.faCircleCheck = faCircleExclamation;
      this.title = 'It seems this system has never been polled.'
    } else if (this.system?.status !== 'OK') {
      this.class = 'text-danger';
      this.faCircleCheck = faCircleXmark;
      this.title = 'The last poll was deemed unsuccessful'
    }
    if (this.system?.lastOkTime.includes("0001-01-01")) {
      this.dateOrNeverCalled = this.system?.lastOkTime ?? "";
      this.dateStyle = "";
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
          }
        },
        error: (err: Error) => {
          console.log("Error while polling: " + err.message);
        }      
      });
    }
    
  }

}
