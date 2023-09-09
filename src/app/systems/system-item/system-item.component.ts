import { Component, Input, OnInit } from '@angular/core';
import { SystemStatusResponse } from '../models/system-status-response';
import { faCircleCheck, faCircleExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-system-item',
  templateUrl: './system-item.component.html',
  styleUrls: ['./system-item.component.css']
})
export class SystemItemComponent implements OnInit {

  @Input() system: SystemStatusResponse | undefined;
  faCircleCheck = faCircleCheck;
  class = 'text-success'
  constructor() { }

  ngOnInit(): void {
    if (this.system?.status === '') {
      this.class = 'text-warning';
      this.faCircleCheck = faCircleExclamation;
    } else if (this.system?.status !== 'OK') {
      this.class = 'text-danger';
      this.faCircleCheck = faCircleXmark;
    }

  }

}
