import { Component, DestroyRef, OnInit, inject, ErrorHandler } from '@angular/core';
import { CertService } from './services/cert.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { ToastrType } from '../shared/enums/toastr-type';
import { Certificate } from './models/certificate';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  destroyRef = inject(DestroyRef);
  certificates: Certificate[] | undefined;
  constructor(private certSvc: CertService, private errHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.certSvc.getCertList().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data: Certificate[]) => {
        if (data) {
          this.certificates = data;
        } else {
          this.errHandler.displayMsgToUser("Got an empty cert-list from backend", ToastrType.info);
        }
      },
      error: (err: Error) => {
        console.log(err);
      }
    });
  }
  updateCert(cert: Certificate) {
    //
  }

}
