import { Component, OnDestroy, OnInit } from '@angular/core';
import { SystemService } from './services/system.service';
import { SystemStatusResponse } from './models/system-status-response';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { ToastrType } from '../shared/enums/toastr-type';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.css']
})
export class SystemsComponent implements OnInit, OnDestroy {

  systemResps!: SystemStatusResponse[];
  displayCert = false;
  alertUrlSub!: Subscription | undefined;
  systemFg = this.fb.group({
    id: [{value: '', disabled: true}], 
    name: ['', Validators.required],
    alertBody: ['', Validators.required, Validators.maxLength(500)],
    alertEmail: [''],
    alertUrl: [''],
    callBody: [''],
    callUrl: ['', Validators.required],
    certExpirationDays: [''],
    certStatus: [{value: '', disabled: true}],
    clientCertId: [], 
    httpMethod: [''],
    lastFailTime: [{value: '', disabled: true}],
    lastOkTime: [{value: '', disabled: true}],
    message: [''],
    responseMatch: ['', Validators.required],
    status: [{value: '', disabled: false}]
  })

  constructor(private systemSvc: SystemService, private errHandler: ErrorHandlerService, private fb: FormBuilder) { }

  ngOnInit(): void {
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
    this.alertUrlSub = this.systemFg.controls['alertUrl'].valueChanges.subscribe(value => {
      if (value?.includes("https")) {
        this.displayCert = true;
      } else {
        this.displayCert = false;
      }
    })
  }
  ngOnDestroy(): void {
      if (this.alertUrlSub) {
        this.alertUrlSub.unsubscribe();
      }
  }

}
