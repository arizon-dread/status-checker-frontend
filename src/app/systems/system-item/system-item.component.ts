import { Component, OnInit } from '@angular/core';
import { SystemStatusResponse } from '../models/system-status-response';

@Component({
  selector: 'app-system-item',
  templateUrl: './system-item.component.html',
  styleUrls: ['./system-item.component.css']
})
export class SystemItemComponent implements OnInit {

  system: SystemStatusResponse | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
