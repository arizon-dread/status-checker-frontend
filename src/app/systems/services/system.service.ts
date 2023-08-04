import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SystemStatusResponse } from '../models/system-status-response';
import { ConfigService } from 'src/app/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient, private cfgSvc: ConfigService) { }

  getSystems() {
    return this.http.get<SystemStatusResponse>(this.cfgSvc.apiBaseUrl + 'systemstatus')
    //implement ErrorHandler.
      // .pipe(
      //   catchError()
      // )
  }
}
