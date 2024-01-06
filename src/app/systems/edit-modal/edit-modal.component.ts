import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SystemStatusResponse } from '../models/system-status-response';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { SystemService } from '../services/system.service';
import { ToastrType } from 'src/app/shared/enums/toastr-type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent implements OnInit, OnDestroy {
  displayCert = false;
  alertUrlSub!: Subscription | undefined;
  title = 'Editing ';
  form = this.fb.group({
    id: [{ value: 0, disabled: true }],
    name: ['', Validators.required],
    alertBody: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(500)]),
    ],
    alertEmail: [''],
    alertUrl: [''],
    callBody: [''],
    callUrl: ['', Validators.required],
    certExpirationDays: [0],
    certStatus: [{ value: '', disabled: true }],
    clientCertId: [0],
    httpMethod: [''],
    lastFailTime: [{ value: '', disabled: true }],
    lastOkTime: [{ value: '', disabled: true }],
    message: [''],
    responseMatch: ['', Validators.required],
    status: [{ value: '', disabled: false }],
  });
  constructor(
    private systemSvc: SystemService,
    private errHandler: ErrorHandlerService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: SystemStatusResponse,
    private matDialogRef: MatDialogRef<EditModalComponent>
  ) {}

  ngOnInit(): void {
    if (this.data?.name) {
      this.title += this.data.name;
    } else {
      this.title = 'Add system to monitor';
    }
    this.form.patchValue(this.data);
    this.alertUrlSub = this.form.controls['alertUrl'].valueChanges.subscribe(
      (value) => {
        if (value?.includes('https')) {
          this.displayCert = true;
        } else {
          this.displayCert = false;
        }
      }
    );
  }
  ngOnDestroy(): void {
    if (this.alertUrlSub) {
      this.alertUrlSub.unsubscribe();
    }
  }
  close(system: SystemStatusResponse | null) {
    if (system) {
      //save
      if (this.form.valid) {
        this.matDialogRef.close(system);
      }
    } else {
      this.matDialogRef.close();
      //close
    }
  }
}
