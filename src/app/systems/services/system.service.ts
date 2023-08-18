import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemStatusResponse } from '../models/system-status-response';
import { ConfigService } from 'src/app/services/config.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient, private cfgSvc: ConfigService, private errHandler: ErrorHandlerService) { }

  systems: SystemStatusResponse[] | undefined;
  getSystems() : Observable<SystemStatusResponse[]>{
    return this.http.get<SystemStatusResponse[]>(this.cfgSvc.config.apiBaseUrl + 'systemstatus')
      .pipe(
        catchError(this.errHandler.handleError("getSystems", this.systems, "Unable to get systems from backend", true))
      );
  }
}
