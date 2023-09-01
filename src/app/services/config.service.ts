import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../models/config';
import { Observable, of } from 'rxjs';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient, private errHandler: ErrorHandlerService) {}

  public static config: Config = {apiBaseUrl: ""};

  loadConfig(): Observable<Config> {
    console.log("loading config..");
    
    
    return this.http.get<Config>("/config/config.json");

  }
  
}
