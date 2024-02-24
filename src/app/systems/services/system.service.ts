import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemStatusResponse } from '../models/system-status-response';
import { ConfigService } from 'src/app/services/config.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SystemStatusRequest } from '../models/system-status-request';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient, private errHandler: ErrorHandlerService) { }

  systems: SystemStatusResponse[] | undefined;
  system: SystemStatusResponse | undefined;
  getSystems() : Observable<SystemStatusResponse[]> {
    console.log("config: "+ ConfigService.config.apiBaseUrl);
    return this.http.get<SystemStatusResponse[]>(ConfigService.config.apiBaseUrl + '/systemstatus')
      .pipe(
        catchError(this.errHandler.handleError("getSystems", this.systems, "Unable to get systems from backend", true))
      );
  }
  getSystem(id: number) : Observable<SystemStatusResponse> {
    return this.http.get<SystemStatusResponse>(ConfigService.config.apiBaseUrl + '/systemstatus/' + id)
      .pipe(
        catchError(this.errHandler.handleError("getSystem", this.system, "Unable to get system from backend"))
      );
  }
  saveSystem(system: SystemStatusRequest) : Observable<SystemStatusResponse> {
    return this.http.post<SystemStatusResponse>(ConfigService.config.apiBaseUrl + '/systemstatus', system)
      .pipe(
        catchError(this.errHandler.handleError("saveSystem", this.system, "Unablet to save system to database"))
      );
  }
}
