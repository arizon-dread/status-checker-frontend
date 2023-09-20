import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SystemStatusResponse } from '../models/system-status-response';
import { faCircleCheck, faCircleExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { SystemService } from '../services/system.service';
import { Subscription } from 'rxjs';

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
  }
  ngOnDestroy(): void {
      if (this.systemSub) {
        this.systemSub.unsubscribe();
      }
  }
  poll() {
    if (this.system) {
      this.systemSvc.getSystem(this.system?.id);
    }
    
  }

}
