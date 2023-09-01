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
    //const promise = 
    console.log("loading config..");
    // const confSub = this.http.get<Config>("/config/config.json").subscribe({
    //   next: (data: Config) => {
    //     this.config = data;
    //     return of(data).toPromise();      
    //   },
    //   error: (err: Error) => {
    //     this.errHandler.handleError("loadConfig", this.config, "Unable to load config", true);
        
    //   },
    //   complete: () => {
    //     confSub.unsubscribe();
    //   }
      
    // });
    //return of(this.config).toPromise();
    // return new Promise((resolve, reject) => {
    //   const config = this.http.get<Config>("/config/config.json").toPromise();
    // });
    
    return this.http.get<Config>("/config/config.json")
    //.toPromise<Config>()
        // .then(data => {
        //   ConfigService.config = data as Config;
        //   console.log(ConfigService.config);
        //   //Object.assign(this, data)
          
        //   return data;//Promise.resolve(data);
        // });


    //return promise;
  }
  
}
