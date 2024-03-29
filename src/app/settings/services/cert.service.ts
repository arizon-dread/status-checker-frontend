import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from 'src/app/services/config.service';
import { Certificate } from '../models/certificate';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CertService {

  constructor(private http: HttpClient, private errHandler: ErrorHandlerService) { }
  certs: Certificate[] | undefined;
  getCertList() : Observable<Certificate[]> {
    return this.http.get<Certificate[]>(ConfigService.config.apiBaseUrl + "/clientcerts")
      .pipe(
        catchError(this.errHandler.handleError("getCertList", this.certs, "unable getting certs from backend"))
      );
  }
}
