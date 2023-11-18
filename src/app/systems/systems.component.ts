import { Component, OnInit } from '@angular/core';
import { SystemService } from './services/system.service';
import { SystemStatusResponse } from './models/system-status-response';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { ToastrType } from '../shared/enums/toastr-type';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.css']
})
export class SystemsComponent implements OnInit {
  systemResps: SystemStatusResponse[] | undefined;

  constructor (private systemSvc: SystemService, private errHandler: ErrorHandlerService) {}
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
}
