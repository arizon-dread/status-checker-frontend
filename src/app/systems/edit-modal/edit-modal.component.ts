import { Component, DestroyRef, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { SystemStatusResponse } from '../models/system-status-response';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { SystemService } from '../services/system.service';
import { ToastrType } from 'src/app/shared/enums/toastr-type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SystemStatusRequest } from '../models/system-status-request';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent implements OnInit {
  destroyRef = inject(DestroyRef);
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
    httpMethod: ['GET', Validators.required],
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
    this.form.controls['alertUrl'].valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      (value) => {
        if (value?.includes('https')) {
          this.displayCert = true;
        } else {
          this.displayCert = false;
        }
      }
    );
  }
  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const formValue = this.form.value;
      const req: SystemStatusRequest = {
        id: formValue.id ?? undefined,
        name: formValue.name!,
        alertBody: formValue.alertBody!,
        alertUrl: formValue.alertUrl ?? undefined,
        alertEmail: formValue.alertEmail ?? undefined,
        callBody: formValue.callBody ?? undefined,
        callUrl: formValue.callUrl!,
        httpMethod: formValue.httpMethod!,
        responseMatch: formValue.responseMatch!,
        clientCertId: ((formValue.clientCertId === 0 || formValue === null || formValue.clientCertId === undefined) ? undefined : formValue.clientCertId!),
      };
      this.matDialogRef.close(req);
    } else {
      this.errHandler.displayMsgToUser("The form is not valid", ToastrType.error);
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
